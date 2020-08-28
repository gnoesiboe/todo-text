import { applyIsEditingAnItemSelector } from './../../../model/selectors/todoListItemSelectors';
import { KeyCode } from './../../../constants/keyCodes';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { useEffect } from 'react';

export default function useStartEditFirstOnKeyDown() {
    const { items, startEditFirst } = useTodoContext();

    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (event.keyCode !== KeyCode.Down) {
                return;
            }

            if (applyIsEditingAnItemSelector(items)) {
                return;
            }

            event.preventDefault();

            startEditFirst();
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [items]);
}
