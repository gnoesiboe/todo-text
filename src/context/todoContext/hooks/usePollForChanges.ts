import { useAuthenticationContext } from './../../authenticationContext/AuthenticationContext';
import { useEffect } from 'react';
import { pollForChanges as pollDropboxForChanges } from '../../../dropbox/storage/dropboxStorage';

export default function usePollForChanges(refetchTodos: () => any) {
    const { accessToken } = useAuthenticationContext();

    const pollForChanges = async (accessToken: string) => {
        const hasChanges = await pollDropboxForChanges(accessToken);

        if (hasChanges) {
            refetchTodos();
        }

        pollForChanges(accessToken);
    };

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        pollForChanges(accessToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);
}
