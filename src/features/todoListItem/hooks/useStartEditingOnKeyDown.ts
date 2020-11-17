import { useIsEditingNotes } from './../../../context/activityContext/ActivityContext';
import { checkKeyDefinitionIsPressed } from './../../../utility/keyboardNavigationUtilities';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { useEffect } from 'react';
import { editCurrentItem } from '../../../constants/keyDefnitions';

export default function useStartEditingOnKeyDown(current: boolean) {
    const { startEdit, isEditing } = useTodoContext();

    const isEditingNotes = useIsEditingNotes();

    useEffect(() => {
        if (!current || isEditing || isEditingNotes) {
            return;
        }

        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (!checkKeyDefinitionIsPressed(editCurrentItem, event)) {
                return;
            }

            // prevent typing in input field when edit mode starts
            event.preventDefault();

            startEdit();
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [current, isEditing, startEdit, isEditingNotes]);
}
