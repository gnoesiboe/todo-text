import { fetchNotesFromDropbox } from 'dropbox/storage/dropboxStorage';
import { useAuthenticationContext } from 'context/authenticationContext/AuthenticationContext';
import { useEffect, useState } from 'react';
import { Mode } from './useManageMode';

export default function useManageEditorValue(mode: Mode) {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const [value, setValue] = useState<string>('');

    const { accessToken } = useAuthenticationContext();

    const fetchNotes = async () => {
        if (isFetching || !accessToken || mode !== Mode.View) {
            return;
        }

        setIsFetching(true);

        const notes = await fetchNotesFromDropbox(accessToken);

        if (notes) {
            setValue(notes);
        }

        setIsFetching(false);
    };

    // initial fetch on mount
    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const onWindowFocus = () => fetchNotes();

        window.addEventListener('focus', onWindowFocus);

        return () => window.removeEventListener('focus', onWindowFocus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (newValue: string) => setValue(newValue);

    return { value, onChange, isFetching };
}
