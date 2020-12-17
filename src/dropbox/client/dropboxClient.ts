import {
    resolveDropboxApiKey,
    resolveDropboxApiSecret,
} from './../../utility/environmentUtlities';
import { Dropbox } from 'dropbox';

export const createOfficialDropboxClient = (accessToken?: string): Dropbox => {
    return new Dropbox({
        clientId: resolveDropboxApiKey(),
        clientSecret: resolveDropboxApiSecret(),
        accessToken,
    });
};
