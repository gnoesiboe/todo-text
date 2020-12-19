import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';
import { useEffect } from 'react';
import { useTodoContext } from 'context/todoContext/TodoContext';
import {
    createNewItemAfterCurrent as createNewItemAfterCurrentKeyDefinition,
    createNewItemBeforeCurrent as createNewItemBeforeCurrentKeyDefinition,
} from 'constants/keyDefnitions';
import useManageIsEditingState from 'context/notesContext/hooks/useManageIsEditingState';

export default function useAddNewItemOnKeyboardShortcutPressed() {
    const {
        currentItem,
        isEditing,
        createNewItemBeforeCurrent,
        createNewItemAfterCurrent,
        createNewItemAtTheStart,
        startEdit,
    } = useTodoContext();

    const { isEditing: isEditingNotes } = useManageIsEditingState();

    useEffect(() => {
        if (isEditing || isEditingNotes) {
            return;
        }

        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                checkKeyDefinitionIsPressed(
                    createNewItemAfterCurrentKeyDefinition,
                    event,
                )
            ) {
                if (currentItem) {
                    createNewItemAfterCurrent();
                } else {
                    createNewItemAtTheStart();
                }

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
        createNewItemAtTheStart,
        isEditingNotes,
    ]);
}
