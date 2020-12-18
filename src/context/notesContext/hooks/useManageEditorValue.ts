import { fetchNotesFromDropbox } from 'dropbox/storage/dropboxStorage';
import { useAuthenticationContext } from 'context/authenticationContext/AuthenticationContext';
import { useCallback, useEffect, useState } from 'react';

export default function useManageEditorValue() {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const [value, setValue] = useState<string>('');

    const { accessToken } = useAuthenticationContext();

    const fetchNotes = useCallback(async () => {
        if (isFetching || !accessToken) {
            return;
        }

        setIsFetching(true);

        const notes = await fetchNotesFromDropbox(accessToken);

        if (notes) {
            setValue(notes);
        }

        setIsFetching(false);
    }, [isFetching, accessToken]);

    // initial fetch on mount
    useEffect(() => {
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
