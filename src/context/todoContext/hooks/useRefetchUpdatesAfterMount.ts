import { useEffect } from 'react';

const fetchEverySeconds = 30;

export default function useRefetchUpdatesAfterMount(
    isFetching: boolean,
    currentItem: string | null,
    refetch: () => void,
    isSaving: boolean,
) {
    useEffect(() => {
        if (!isFetching && !currentItem && !isSaving) {
            const handle = setInterval(() => {
                refetch();
            }, fetchEverySeconds * 1000);

            return () => clearInterval(handle);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching, currentItem, isSaving]);
}
