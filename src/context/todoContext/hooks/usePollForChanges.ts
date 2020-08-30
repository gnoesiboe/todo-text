import { useAuthenticationContext } from './../../authenticationContext/AuthenticationContext';
import { useEffect } from 'react';
import { pollForChanges as pollDropboxForChanges } from './../../../storage/dropbox/dropboxClient';

export default function usePollForChanges(refetchTodos: () => any) {
    const { accessToken } = useAuthenticationContext();

    const pollForChanges = async (accessToken: string) => {
        try {
            const hasChanges = await pollDropboxForChanges(accessToken);

            if (hasChanges) {
                refetchTodos();
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
