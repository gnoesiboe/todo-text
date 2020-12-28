import { notifyError } from 'utility/notifier';
import { createDropboxClient } from './../client/dropboxClient';
import { clear as clearTokenStorage } from 'model/repository/accessTokenRepository';

export const redirectToAuthenticate = (redirectUri: string) => {
    // @ts-ignore → Somehow the Typescript types are wrong
    const urlToRedirectTo = createDropboxClient().auth.getAuthenticationUrl(
        redirectUri,
        undefined,
        'code',
    );

    window.location.href = urlToRedirectTo;
};

const reloadTimeoutLength = 3000; // 3 seconds

export const redirectAndNotifyUserWhenLoggedOut = () => {
    notifyError(
        `Je bent uitgelogd, de pagina wordt over ${
            reloadTimeoutLength / 1000
        } seconden ververst om je opnieuw in te laten loggen`,
    );

    // clear token storage so a new token is requested
    clearTokenStorage();

    setTimeout(() => window.location.reload(), reloadTimeoutLength);

    return;
};
