import { checkKeyDefinitionIsPressed } from './../../../utility/keyboardNavigationUtilities';
import { useEffect } from 'react';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import {
    createNewItemAfterCurrent as createNewItemAfterCurrentKeyDefinition,
    createNewItemBeforeCurrent as createNewItemBeforeCurrentKeyDefinition,
} from '../../../constants/keyDefnitions';
export default function useAddNewItemOnKeyboardShortcutPressed() {
    const {
        currentItem,
        isEditing,
        createNewItemBeforeCurrent,
        createNewItemAfterCurrent,
        startEdit,
    } = useTodoContext();

    useEffect(() => {
        if (!currentItem || isEditing) {
            return;
        }

        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                checkKeyDefinitionIsPressed(
                    createNewItemAfterCurrentKeyDefinition,
                    event,
                )
            ) {
                createNewItemAfterCurrent();
                startEdit();
            } else if (
                checkKeyDefinitionIsPressed(
                    createNewItemBeforeCurrentKeyDefinition,
                    event,
                )
            ) {
                createNewItemBeforeCurrent();
                startEdit();
            }
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [
        currentItem,
        isEditing,
        startEdit,
        createNewItemBeforeCurrent,
        createNewItemAfterCurrent,
    ]);
}
