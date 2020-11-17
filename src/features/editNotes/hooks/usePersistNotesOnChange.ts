import { resolveDropboxNotesFileName } from './../../../utility/environmentUtlities';
import { useAuthenticationContext } from './../../../context/authenticationContext/AuthenticationContext';
import { useEffect, useState } from 'react';
import { pushDataToDropbox } from '../../../dropbox/storage/dropboxStorage';

const pushToDropboxThrottle = 3000; // 3 seconds

export default function usePersistNotesOnChange(
    value: string,
    isFetching: boolean,
) {
    const [hasOpenChanges, setHasOpenChanges] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { accessToken } = useAuthenticationContext();

    useEffect(() => {
        setHasOpenChanges(true);

        if (!accessToken || isFetching) {
            return;
        }

        const handle = setTimeout(() => {
            setIsSaving(true);

            pushDataToDropbox(
                accessToken,
                value,
                resolveDropboxNotesFileName(),
            ).finally(() => {
                setHasOpenChanges(false);
                setIsSaving(false);
            });
        }, pushToDropboxThrottle);

        return () => clearTimeout(handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, isFetching]);

    return { hasOpenChanges, isSaving };
}
