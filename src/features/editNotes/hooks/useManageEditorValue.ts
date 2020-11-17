import { resolveDropboxNotesFileName } from './../../../utility/environmentUtlities';
import { isFileNotFoundError } from './../../../dropbox/utility/errorIdentificationUtilities';
import {
    fetchDataFromDropbox,
    pushDataToDropbox,
} from './../../../dropbox/storage/dropboxStorage';
import { useAuthenticationContext } from './../../../context/authenticationContext/AuthenticationContext';
import { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../../utility/notifier';
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

        try {
            const notes = await fetchDataFromDropbox(accessToken);

            if (notes) {
                setValue(notes);
            }
        } catch (error) {
            if (isFileNotFoundError(error)) {
                await pushDataToDropbox(
                    accessToken,
                    '# Notes',
                    resolveDropboxNotesFileName(),
                );

                notifySuccess(
                    'File did not exist (anymore) in Dropbox. We created a new one',
                );

                return;
            }

            const errorMessage =
                'An error occurred while fetching the todos from dropbox';

            notifyError(errorMessage);

            console.error(errorMessage, error);
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
