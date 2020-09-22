import { useState } from 'react';

export default function useToggleFilters() {
    const [hideWaiting, setHideWaiting] = useState<boolean>(false);

    const onHideWaitingClick = () => {
        setHideWaiting((currentValue) => !currentValue);
    };

    return { hideWaiting, onHideWaitingClick };
}
