import { clear as clearTokenStorage } from '../../model/repository/accessTokenRepository';
import { isLoggedOutError } from '../utility/errorIdentificationUtilities';
import axios, { AxiosInstance } from 'axios';
import { notifyError } from '../../utility/notifier';

const reloadTimeoutLength = 3000; // 3 seconds

let clientInstance: AxiosInstance;

export const getDropboxClient = () => {
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
