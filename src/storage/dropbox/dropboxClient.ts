import { formatBodyAsFormData } from './../../utility/requestUtilities';
import { createQueryString } from '../../utility/requestUtilities';
import { apiKey, apiSecret } from './../../constants/dropbox';
import axios from 'axios';

// @todo implement https://www.dropbox.com/lp/developers/reference/oauth-guide for security reasons!

const apiHost = 'https://api.dropboxapi.com';
const jsonFilePath = '/item.json';

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

    const { data } = await axios.post(`${apiHost}/oauth2/token`, body, {
        auth: {
            username: apiKey,
            password: apiSecret,
        },
    });

    return data.access_token;
};

const createAuthorizationToken = (accessToken: string) =>
    `Bearer ${accessToken}`;

export const pushTodosToDropbox = async (accessToken: string, json: string) => {
    const url = `https://content.dropboxapi.com/2/files/upload`;

    await axios.post(url, json, {
        headers: {
            Authorization: createAuthorizationToken(accessToken),
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
                path: jsonFilePath,
                mode: 'overwrite',
            }),
        },
    });
};

export const fetchTodosFromDropbox = async (accessToken: string) => {
    const url = `https://content.dropboxapi.com/2/files/download`;

    const { data } = await axios.post(url, undefined, {
        headers: {
            Authorization: createAuthorizationToken(accessToken),
            'Dropbox-API-Arg': JSON.stringify({
                path: jsonFilePath,
            }),
        },
    });

    return data;
};
