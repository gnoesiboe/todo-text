import { isDevelopmentEnvironment } from 'utility/environmentUtlities';
import { useEffect } from 'react';

export default function useConfirmCloseWhenThereAreOpenChanges(
    hasOpenChanges: boolean,
) {
    useEffect(() => {
        if (hasOpenChanges && !isDevelopmentEnvironment) {
            window.onbeforeunload = () =>
                'You have pending changes. Are you sure?';

            return () => {
                window.onbeforeunload = null;
            };
        }
    }, [hasOpenChanges]);
}
