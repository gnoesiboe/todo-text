import { createDropboxClient } from './../client/dropboxClient';

// @todo implement https://www.dropbox.com/lp/developers/reference/oauth-guide for security reasons!

const fetchAccessToken = async (
    code: string,
    redirectUri: string,
): Promise<string> => {
    const client = createDropboxClient();

    // @ts-ignore → Somehow the Typescript types are wrong
    const { result } = await client.auth.getAccessTokenFromCode(
        redirectUri,
        code,
    );

    return result.access_token;
};

export default fetchAccessToken;
