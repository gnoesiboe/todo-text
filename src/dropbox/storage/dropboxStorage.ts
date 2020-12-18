import { redirectAndNotifyUserWhenLoggedOut } from './../utility/redirectUtilities';
import { isFileNotFoundError } from 'dropbox/utility/errorIdentificationUtilities';
import { isLoggedOutError } from './../utility/errorIdentificationUtilities';
import { createOfficialDropboxClient } from './../client/dropboxClient';
import {
    resolveDropboxFileName,
    resolveDropboxNotesFileName,
} from 'utility/environmentUtlities';
import { TodoListItem } from 'model/TodoListItem';
import { normalizeAndValidateTodos } from '../utility/normalizationAndValidationUtilities';
import { notifyError, notifySuccess } from 'utility/notifier';

// @todo implement https://www.dropbox.com/lp/developers/reference/oauth-guide for security reasons!

export const fetchAccessToken = async (
    code: string,
    redirectUri: string,
): Promise<string> => {
    const client = createOfficialDropboxClient();

    // @ts-ignore → Somehow the Typescript types are wrong
    const { result } = await client.auth.getAccessTokenFromCode(
        redirectUri,
        code,
    );

    return result.access_token;
};

export const pushDataToDropbox = async (
    accessToken: string,
    json: string,
    fileName: string,
) => {
    const client = createOfficialDropboxClient(accessToken);

    try {
        client.filesUpload({
            path: `/${fileName}`,
            mode: {
                '.tag': 'overwrite',
            },
            contents: json,
        });
    } catch (error) {
        const errorMessage = 'An error occurred while persisting the todos';

        notifyError(errorMessage);
        console.error(errorMessage, error);

        if (isLoggedOutError(error)) {
            redirectAndNotifyUserWhenLoggedOut();
        }
    }
};

export const fetchNotesFromDropbox = async (
    accessToken: string,
): Promise<string | null> => {
    const client = createOfficialDropboxClient(accessToken);

    try {
        const { result } = await client.filesDownload({
            path: `/${resolveDropboxNotesFileName()}`,
        });

        // @ts-ignore → Somehow the types are wrong
        return await new Response(result.fileBlob).text();
    } catch (error) {
        if (isLoggedOutError(error)) {
            redirectAndNotifyUserWhenLoggedOut();

            return null;
        }

        if (isFileNotFoundError(error)) {
            const initialContent = '# notes';

            await pushDataToDropbox(
                accessToken,
                initialContent,
                resolveDropboxNotesFileName(),
            );

            notifySuccess(
                'File did not exist (anymore) in Dropbox. We created a new one',
            );

            return initialContent;
        }

        const errorMessage =
            'An error occurred while fetching the notes from Dropbox';

        notifyError(errorMessage);
        console.error(errorMessage, error);

        return null;
    }
};

export const fetchTodosFromDropbox = async (
    accessToken: string,
): Promise<TodoListItem[] | null> => {
    const client = createOfficialDropboxClient(accessToken);

    try {
        const { result } = await client.filesDownload({
            path: `/${resolveDropboxFileName()}`,
        });

        // @ts-ignore → Somehow the types are wrong
        const rawContent = await new Response(result.fileBlob).text();

        const parsedContent = JSON.parse(rawContent);

        return normalizeAndValidateTodos(parsedContent);
    } catch (error) {
        if (isLoggedOutError(error)) {
            redirectAndNotifyUserWhenLoggedOut();

            return null;
        }

        if (isFileNotFoundError(error)) {
            await pushDataToDropbox(
                accessToken,
                '[]',
                resolveDropboxFileName(),
            );

            notifySuccess(
                'Todos did not exist (anymore) in Dropbox. We created a new one',
            );

            return [];
        }

        const errorMessage = 'An error occurred while fetching the todos';

        notifyError(errorMessage);
        console.error(errorMessage, error);

        return null;
    }
};
