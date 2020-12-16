import { useIsEditingNotes } from 'context/activityContext/ActivityContext';
import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';
import { useTodoContext } from 'context/todoContext/TodoContext';
import { useEffect } from 'react';
import { navigateToPrevious } from 'constants/keyDefnitions';

export default function useNavigateToPreviousItemOnUpKeyPressed() {
    const { moveToPrevious, isEditing } = useTodoContext();

    const isEditingNotes = useIsEditingNotes();

    useEffect(() => {
        if (isEditing || isEditingNotes) {
            return;
        }

        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (!checkKeyDefinitionIsPressed(navigateToPrevious, event)) {
                return;
            }

            event.preventDefault();

            moveToPrevious();
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [moveToPrevious, isEditing, isEditingNotes]);
}
