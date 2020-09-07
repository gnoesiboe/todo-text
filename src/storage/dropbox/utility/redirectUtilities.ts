import { resolveDropboxApiKey } from './../../../utility/environmentUtlities';
import { createQueryString } from './../../../utility/requestUtilities';

const apiKey = resolveDropboxApiKey();

export const redirectToAuthenticate = (redirectUri: string) => {
    const queryString = createQueryString({
        client_id: apiKey,
        redirect_uri: redirectUri,
        response_type: 'code',
    });

    window.location.href = `https://www.dropbox.com/oauth2/authorize?${queryString}`;
};
