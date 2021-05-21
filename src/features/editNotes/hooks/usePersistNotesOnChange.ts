import { useEffect, useState } from 'react';
import { useLoggedInUser } from '../../../context/authenticationContext/AuthenticationContext';
import { persist } from '../../../repository/noteRepository';
import { notifyError } from '../../../utility/notifier';

const timeoutThrottle = 3000; // 3 seconds

export default function usePersistNotesOnChange(
    value: string,
    isFetching: boolean,
) {
    const [hasOpenChanges, setHasOpenChanges] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const user = useLoggedInUser();

    useEffect(() => {
        if (!user) {
            return;
        }

        setHasOpenChanges(true);

        if (isFetching) {
            return;
        }

        const handle = setTimeout(() => {
            setIsSaving(true);

            persist(user.id, { value })
                .then((success) => {
                    if (!success) {
                        notifyError(
                            'Something went wrong when updating the notes. Please refresh and try again',
                        );
                    }
                })
                .finally(() => setIsSaving(false));
        }, timeoutThrottle);

        return () => clearTimeout(handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, isFetching, user]);

    return { hasOpenChanges, isSaving };
}
