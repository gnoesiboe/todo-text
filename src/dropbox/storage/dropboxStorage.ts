import {
    resolveDropboxFileName,
    resolveDropboxNotesFileName,
} from 'utility/environmentUtlities';
import { TodoListItem } from 'model/TodoListItem';
import { normalizeAndValidateTodos } from '../utility/normalizationAndValidationUtilities';
import {
    resolveDropboxApiKey,
    resolveDropboxApiSecret,
} from 'utility/environmentUtlities';
import { formatBodyAsFormData } from 'utility/requestUtilities';
import { getDropboxClient } from '../client/dropboxClient';
import { createAuthorizationHeader } from '../utility/headerUtilities';
import { notifyError } from 'utility/notifier';

const apiHost = 'https://api.dropboxapi.com';
const contentHost = 'https://content.dropboxapi.com';
const notifyHost = 'https://notify.dropboxapi.com';

const apiKey = resolveDropboxApiKey();
const apiSecret = resolveDropboxApiSecret();

// @todo implement https://www.dropbox.com/lp/developers/reference/oauth-guide for security reasons!

export const fetchAccessToken = async (
    code: string,
    redirectUri: string,
): Promise<string> => {
    const body = formatBodyAsFormData({
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
    });

    const { data } = await getDropboxClient().post(
        `${apiHost}/oauth2/token`,
        body,
        {
            auth: {
                username: apiKey,
                password: apiSecret,
            },
        },
    );

    return data.access_token;
};

export const pushDataToDropbox = async (
    accessToken: string,
    json: string,
    fileName: string,
) => {
    const url = `${contentHost}/2/files/upload`;

    await getDropboxClient().post(url, json, {
        headers: {
            Authorization: createAuthorizationHeader(accessToken),
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
                path: `/${fileName}`,
                mode: 'overwrite',
            }),
        },
    });
};

export const fetchDataFromDropbox = async (
    accessToken: string,
): Promise<string | null> => {
    const url = `${contentHost}/2/files/download`;

    const response = await getDropboxClient().post(url, undefined, {
        headers: {
            Authorization: createAuthorizationHeader(accessToken),
            'Dropbox-API-Arg': JSON.stringify({
                path: `/${resolveDropboxNotesFileName()}`,
            }),
        },
    });

    if (!response || !response.data) {
        return null;
    }

    return response.data;
};

export const fetchTodosFromDropbox = async (
    accessToken: string,
): Promise<TodoListItem[] | null> => {
    const url = `${contentHost}/2/files/download`;

    const response = await getDropboxClient().post(url, undefined, {
        headers: {
            Authorization: createAuthorizationHeader(accessToken),
            'Dropbox-API-Arg': JSON.stringify({
                path: `/${resolveDropboxFileName()}`,
            }),
        },
    });

    if (!response || !response.data) {
        return null;
    }

    return normalizeAndValidateTodos(response.data);
};

const fetchFolderCursor = async (accessToken: string): Promise<string> => {
    const url = `${apiHost}/2/files/list_folder`;

    const { data } = await getDropboxClient().post(
        url,
        {
            path: '',
        },
        {
            headers: {
                Authorization: createAuthorizationHeader(accessToken),
                'Content-Type': 'application/json',
            },
        },
    );

    return data.cursor;
};

export const pollForChanges = async (accessToken: string): Promise<boolean> => {
    const cursor = await fetchFolderCursor(accessToken);

    const url = `${notifyHost}/2/files/list_folder/longpoll`;

    try {
        const body = await getDropboxClient().post(
            url,
            {
                cursor,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!body) {
            return false;
        }

        return body?.data?.changes || false;
    } catch (error) {
        const errorMessage =
            'An error occurred while polling the dropbox api for changes';

        notifyError(errorMessage);
        console.error(errorMessage, error);

        return false;
    }
};
