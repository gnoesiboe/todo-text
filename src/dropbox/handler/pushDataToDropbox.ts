import { redirectAndNotifyUserWhenLoggedOut } from './../utility/redirectUtilities';
import { isLoggedOutError } from './../utility/errorIdentificationUtilities';
import { notifyError } from 'utility/notifier';
import { createDropboxClient } from './../client/dropboxClient';

const pushData = async (
    accessToken: string,
    json: string,
    fileName: string,
) => {
    const client = createDropboxClient(accessToken);

    try {
        client.filesUpload({
            path: `/${fileName}`,
            mode: {
                '.tag': 'overwrite',
            },
            contents: json,
        });
    } catch (error) {
        const errorMessage = 'An error occurred while persisting the todos';

        notifyError(errorMessage);
        console.error(errorMessage, error);

        if (isLoggedOutError(error)) {
            redirectAndNotifyUserWhenLoggedOut();
        }
    }
};

export default pushData;
