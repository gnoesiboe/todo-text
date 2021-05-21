import { useCallback, useRef } from 'react';

export type CheckHasOpenChangesHandler = () => boolean;
export type SetHasOpenChangesHandler = (hasOpenChanges: boolean) => void;

export default function useManageHasOpenChangesState() {
    // save open changes state in ref to always have access to the up-to-dated value, even in
    // promises and memoized callbacks. Required to decide, when fetching, if the
    // fetched results should overwrite the current state or not
    const openChangesRef = useRef<boolean>(false);

    const checkHasOpenChanges = useCallback<CheckHasOpenChangesHandler>(
        () => openChangesRef.current,
        [],
    );

    const setHasOpenChanges = useCallback<SetHasOpenChangesHandler>(
        (hasOpenChanges) => {
            openChangesRef.current = hasOpenChanges;
        },
        [],
    );

    return { checkHasOpenChanges, setHasOpenChanges };
}
