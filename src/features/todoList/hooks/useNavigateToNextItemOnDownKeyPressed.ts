import { useIsEditingNotes } from 'context/activityContext/ActivityContext';
import { navigateToNext } from 'constants/keyDefnitions';
import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';
import { useTodoContext } from 'context/todoContext/TodoContext';
import { useEffect } from 'react';

export default function useNavigateToNextItemOnDownKeyPressed() {
    const { moveToNext, isEditing } = useTodoContext();

    const isEditingNotes = useIsEditingNotes();

    useEffect(() => {
        if (isEditing || isEditingNotes) {
            return;
        }

        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (!checkKeyDefinitionIsPressed(navigateToNext, event)) {
                return;
            }

            event.preventDefault();

            moveToNext();
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [moveToNext, isEditing, isEditingNotes]);
}
