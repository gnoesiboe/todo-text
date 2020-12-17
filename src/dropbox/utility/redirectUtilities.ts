import { createOfficialDropboxClient } from './../client/dropboxClient';

export const redirectToAuthenticate = (redirectUri: string) => {
    // @ts-ignore → Somehow the Typescript types are wrong
    const urlToRedirectTo = createOfficialDropboxClient().auth.getAuthenticationUrl(
        redirectUri,
        undefined,
        'code',
    );

    window.location.href = urlToRedirectTo;
};
