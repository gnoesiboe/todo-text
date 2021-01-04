import { TodoListItemCollection } from 'model/TodoListItem';
import { notifySuccess, notifyError } from 'utility/notifier';
import { redirectAndNotifyUserWhenLoggedOut } from '../utility/redirectUtilities';
import {
    isLoggedOutError,
    isFileNotFoundError,
} from '../utility/errorIdentificationUtilities';
import { resolveDropboxFileName } from '../../utility/environmentUtlities';
import { createDropboxClient } from '../client/dropboxClient';
import { normalizeAndValidateTodos } from 'dropbox/utility/normalizationAndValidationUtilities';
import pushDataToDropbox from './pushDataToDropbox';

const fetchTodos = async (
    accessToken: string,
): Promise<TodoListItemCollection | null> => {
    const client = createDropboxClient(accessToken);

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

export default fetchTodos;
