import { useState } from 'react';

export default function useToggleFilters() {
    const [hideWaiting, setHideWaiting] = useState<boolean>(false);
    const [hideDone, setHideDone] = useState<boolean>(false);

    const onHideWaitingClick = () => {
        setHideWaiting((currentValue) => !currentValue);
    };

    const onHideDoneClick = () => {
        setHideDone((currentValue) => !currentValue);
    };

    return { hideWaiting, onHideWaitingClick, hideDone, onHideDoneClick };
}
