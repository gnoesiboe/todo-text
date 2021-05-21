import { useCallback, useEffect, useState } from 'react';
import { fetchOneWithUserId } from '../../../repository/noteRepository';
import { useLoggedInUser } from '../../authenticationContext/AuthenticationContext';

export default function useManageEditorValue() {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const [value, setValue] = useState<string>('');

    const user = useLoggedInUser();

    const fetchNotes = useCallback(async () => {
        if (isFetching || !user) {
            return;
        }

        setIsFetching(true);

        const note = await fetchOneWithUserId(user.id);

        setValue(note?.value || '');

        setIsFetching(false);
    }, [isFetching, user]);

    // initial fetch on mount
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchNotes();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // re-fetch notes on mount
    useEffect(() => {
        const onWindowFocus = () => fetchNotes();

        window.addEventListener('focus', onWindowFocus);

        return () => window.removeEventListener('focus', onWindowFocus);
    }, [fetchNotes]);

    const updateValue = (newValue: string) => setValue(newValue);

    return { value, updateValue, isFetching };
}
