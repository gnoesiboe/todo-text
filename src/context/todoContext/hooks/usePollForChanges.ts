import { useAuthenticationContext } from 'context/authenticationContext/AuthenticationContext';
import { useEffect } from 'react';
import pollDropboxForChanges from 'dropbox/handler/pollForChanges';

export default function usePollForChanges(refetchTodos: () => void) {
    const { accessToken } = useAuthenticationContext();

    const pollForChanges = async (accessToken: string) => {
        const hasChanges = await pollDropboxForChanges(accessToken);

        if (hasChanges) {
            refetchTodos();
        }

        if (hasChanges !== null) {
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
