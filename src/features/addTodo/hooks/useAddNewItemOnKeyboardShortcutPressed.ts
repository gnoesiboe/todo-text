import { useIsEditingNotes } from 'context/notesContext/NotesContext';
import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';
import { useEffect } from 'react';
import { useTodoContext } from 'context/todoContext/TodoContext';
import {
    createNewItemAfterCurrent as createNewItemAfterCurrentKeyDefinition,
    createNewItemBeforeCurrent as createNewItemBeforeCurrentKeyDefinition,
} from 'constants/keyDefnitions';

export default function useAddNewItemOnKeyboardShortcutPressed() {
    const {
        currentItemId,
        isEditing,
        createNewItemBeforeCurrent,
        createNewItemAfterCurrent,
        createNewItemAtTheStart,
        startEdit,
    } = useTodoContext();

    const isEditingNotes = useIsEditingNotes();

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
                if (currentItemId) {
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
        currentItemId,
        isEditing,
        startEdit,
        createNewItemBeforeCurrent,
        createNewItemAfterCurrent,
        createNewItemAtTheStart,
        isEditingNotes,
    ]);
}
