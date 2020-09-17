import { useEffect, useState } from 'react';

export default function useIsTouchDevice(defaultValue: boolean) {
    const [isTouchDevice, setIsTouchDevice] = useState<boolean>(defaultValue);

    useEffect(() => {
        const onTouchStart = () => {
            setIsTouchDevice(true);

            // we only need to know once that a human touched the screen, so we can stop listening now
            window.removeEventListener('touchstart', onTouchStart, false);
        };

        window.addEventListener('touchstart', onTouchStart, false);

        return () =>
            window.removeEventListener('touchstart', onTouchStart, false);
    }, []);

    return isTouchDevice;
}
