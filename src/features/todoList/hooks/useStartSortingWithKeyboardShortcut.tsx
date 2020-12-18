import { useEffect } from 'react';
import { toggleSortingItems } from 'constants/keyDefnitions';
import { useTodoContext } from 'context/todoContext/TodoContext';
import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';
import { useIsEditingNotes } from 'context/notesContext/NotesContext';

export default function useStartSortingWithKeyboardShortcut() {
    const {
        isSorting,
        startSorting,
        stopSorting,
        isEditing: isEditingTodos,
    } = useTodoContext();

    const isEditingNotes = useIsEditingNotes();

    useEffect(() => {
        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (isEditingTodos || isEditingNotes) {
                return;
            }

            if (!checkKeyDefinitionIsPressed(toggleSortingItems, event)) {
                return;
            }

            event.preventDefault();

            isSorting ? stopSorting() : startSorting();
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [isSorting, startSorting, stopSorting, isEditingTodos, isEditingNotes]);
}
