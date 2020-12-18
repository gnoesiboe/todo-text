import { CheckHasOpenChangesHandler } from './useManageHasOpenChangesState';
import { isDevelopmentEnvironment } from 'utility/environmentUtlities';
import { useEffect } from 'react';

export default function useConfirmCloseWhenThereAreOpenChanges(
    checkHasOpenChanges: CheckHasOpenChangesHandler,
) {
    useEffect(() => {
        if (checkHasOpenChanges() && !isDevelopmentEnvironment) {
            window.onbeforeunload = () =>
                'You have pending changes. Are you sure?';

            return () => {
                window.onbeforeunload = null;
            };
        }
    }, [checkHasOpenChanges]);
}
