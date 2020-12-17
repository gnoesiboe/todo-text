import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';
import { useEffect } from 'react';
import { useTodoContext } from 'context/todoContext/TodoContext';
import {
    createNewItemAfterCurrent as createNewItemAfterCurrentKeyDefinition,
    createNewItemBeforeCurrent as createNewItemBeforeCurrentKeyDefinition,
} from 'constants/keyDefnitions';
import useManageActivity from 'context/activityContext/hooks/useManageActivity';

export default function useAddNewItemOnKeyboardShortcutPressed() {
    const {
        currentItem,
        isEditing,
        createNewItemBeforeCurrent,
        createNewItemAfterCurrent,
        createNewItemAtTheStart,
        startEdit,
    } = useTodoContext();

    const { isEditingNotes } = useManageActivity();

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
        isEditingNotes,
    ]);
}
