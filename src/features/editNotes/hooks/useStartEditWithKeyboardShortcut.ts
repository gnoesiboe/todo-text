import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { startEditNotes } from './../../../constants/keyDefnitions';
import { checkKeyDefinitionIsPressed } from './../../../utility/keyboardNavigationUtilities';
import { useEffect } from 'react';
import { Mode } from './useManageMode';

export default function useStartEditWithKeyboardShortcut(
    startEdit: () => void,
    mode: Mode,
) {
    const { isEditing, clearCurrentItem } = useTodoContext();

    useEffect(() => {
        if (isEditing) {
            return;
        }

        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (!checkKeyDefinitionIsPressed(startEditNotes, event)) {
                return;
            }

            clearCurrentItem();

            event.preventDefault();

            startEdit();
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, startEdit, isEditing]);
}
