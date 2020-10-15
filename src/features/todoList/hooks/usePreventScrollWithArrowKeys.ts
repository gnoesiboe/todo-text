import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { useEffect } from 'react';

export default function usePreventScrollWithArrowKeys() {
    const { isEditing } = useTodoContext();

    useEffect(() => {
        if (isEditing) {
            return;
        }

        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', onKeyDown, false);

        return () => window.removeEventListener('keydown', onKeyDown, false);
    }, []);
}
