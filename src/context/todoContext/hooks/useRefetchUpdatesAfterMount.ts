import { useEffect } from 'react';

const fetchEverySeconds = 30;

export default function useRefetchUpdatesAfterMount(
    isFetching: boolean,
    currentItem: string | null,
    refetch: () => void,
) {
    useEffect(() => {
        if (!isFetching && !currentItem) {
            const handle = setInterval(() => {
                refetch();
            }, fetchEverySeconds * 1000);

            return () => clearInterval(handle);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching, currentItem]);
}
