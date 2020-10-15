import { useEffect } from 'react';

export default function usePreventScrollWithArrowKeys() {
    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', onKeyDown, false);

        return () => window.removeEventListener('keydown', onKeyDown, false);
    }, []);
}
