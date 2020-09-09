import { useEffect } from 'react';

export default function useRefetchOnWindowFocus(
    isFetching: boolean,
    currentItem: string | null,
    refetch: () => void,
    isSaving: boolean,
) {
    useEffect(() => {
        if (!isFetching && !currentItem && !isSaving) {
            const onWindowFocus = () => refetch();

            window.addEventListener('focus', onWindowFocus);

            return () => window.removeEventListener('focus', onWindowFocus);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching, currentItem, isSaving]);
}
