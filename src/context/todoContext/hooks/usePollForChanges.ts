import { useEffect } from 'react';
import { pollForChanges as pollDropboxForChanges } from './../../../storage/dropbox/dropboxClient';

export default function usePollForChanges(
    accessToken: string | null,
    fetchTodos: (accessToken: string) => any,
) {
    const pollForChanges = async (accessToken: string) => {
        try {
            const hasChanges = await pollDropboxForChanges(accessToken);

            if (hasChanges) {
                fetchTodos(accessToken);
            }

            pollForChanges(accessToken);
        } catch (error) {
            // @todo notify user?!

            console.error(
                'An error occurred while polling dropbox for changes',
                error,
            );

            pollForChanges(accessToken);
        }
    };

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        pollForChanges(accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);
}
