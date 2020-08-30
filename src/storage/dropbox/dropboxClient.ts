import { clear as clearTokenStorage } from './../../model/repository/accessTokenRepository';
import { isLoggedOutError } from './utility/errorIdentificationUtilities';
import { formatBodyAsFormData } from './../../utility/requestUtilities';
import { createQueryString } from '../../utility/requestUtilities';
import { apiKey, apiSecret } from './../../constants/dropbox';
import axios, { AxiosInstance } from 'axios';
import { notifyError } from '../..//utility/notifier';

// @todo implement https://www.dropbox.com/lp/developers/reference/oauth-guide for security reasons!

const apiHost = 'https://api.dropboxapi.com';
const contentHost = 'https://content.dropboxapi.com';
const notifyHost = 'https://notify.dropboxapi.com';

const jsonFilePath = '/item.json';

const reloadTimeoutLength = 3000; // 3 seconds

let clientInstance: AxiosInstance;

const getClient = () => {
    if (clientInstance) {
        return clientInstance;
    }

    clientInstance = axios.create();

    clientInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (isLoggedOutError(error)) {
                notifyError(
                    `Je bent uitgelogd, de pagina wordt over ${
                        reloadTimeoutLength / 1000
                    } seconden ververst om je opnieuw in te laten loggen`,
                );

                // clear token storage so a new token is requested
                clearTokenStorage();

                setTimeout(() => window.location.reload(), reloadTimeoutLength);
            }
        },
    );

    return clientInstance;
};

export const redirectToAuthenticate = (redirectUri: string) => {
    const queryString = createQueryString({
        client_id: apiKey,
        redirect_uri: redirectUri,
        response_type: 'code',
    });

    window.location.href = `https://www.dropbox.com/oauth2/authorize?${queryString}`;
};

export const fetchAccessToken = async (
    code: string,
    redirectUri: string,
): Promise<string> => {
    const body = formatBodyAsFormData({
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
    });

    const { data } = await getClient().post(`${apiHost}/oauth2/token`, body, {
        auth: {
            username: apiKey,
            password: apiSecret,
        },
    });

    return data.access_token;
};

const createAuthorizationHeader = (accessToken: string) =>
    `Bearer ${accessToken}`;

export const pushTodosToDropbox = async (accessToken: string, json: string) => {
    const url = `${contentHost}/2/files/upload`;

    await getClient().post(url, json, {
        headers: {
            Authorization: createAuthorizationHeader(accessToken),
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
                path: jsonFilePath,
                mode: 'overwrite',
            }),
        },
    });
};

export const fetchTodosFromDropbox = async (accessToken: string) => {
    const url = `${contentHost}/2/files/download`;

    const { data } = await getClient().post(url, undefined, {
        headers: {
            Authorization: createAuthorizationHeader(accessToken),
            'Dropbox-API-Arg': JSON.stringify({
                path: jsonFilePath,
            }),
        },
    });

    return data;
};

const fetchFolderCursor = async (accessToken: string): Promise<string> => {
    const url = `${apiHost}/2/files/list_folder`;

    const { data } = await getClient().post(
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
        const body = await getClient().post(
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
        // @todo notify user?!

        console.error(
            'An error occurred while polling the dropbox api for changes',
            error,
        );

        return false;
    }
};
