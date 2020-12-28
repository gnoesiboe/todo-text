import { redirectAndNotifyUserWhenLoggedOut } from '../utility/redirectUtilities';
import { isLoggedOutError } from '../utility/errorIdentificationUtilities';
import { notifyError } from 'utility/notifier';
import { createDropboxClient } from '../client/dropboxClient';

const fetchFolderCursor = async (accessToken: string): Promise<string> => {
    const client = createDropboxClient(accessToken);

    const { result } = await client.filesListFolderGetLatestCursor({
        path: '',
    });

    return result.cursor;
};

const pollForChanges = async (accessToken: string): Promise<boolean | null> => {
    try {
        const cursor = await fetchFolderCursor(accessToken);

        const client = createDropboxClient();

        const { result } = await client.filesListFolderLongpoll({ cursor });

        return result.changes;
    } catch (error) {
        const errorMessage =
            'An error occurred while polling the dropbox api for changes';

        notifyError(errorMessage);
        console.error(errorMessage, error);

        if (isLoggedOutError(error)) {
            redirectAndNotifyUserWhenLoggedOut();
        }

        return null;
    }
};

export default pollForChanges;
