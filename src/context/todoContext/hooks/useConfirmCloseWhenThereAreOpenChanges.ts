import { useEffect } from 'react';

export default function useConfirmCloseWhenThereAreOpenChanges(
    hasOpenChanges: boolean,
) {
    useEffect(() => {
        console.log('hier!', hasOpenChanges);

        if (hasOpenChanges) {
            window.onbeforeunload = () =>
                'You have pending changes. Are you sure?';

            return () => {
                window.onbeforeunload = null;
            };
        }
    }, [hasOpenChanges]);
}
