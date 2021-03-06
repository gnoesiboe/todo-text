import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';
import { useEffect } from 'react';
import { useTodoContext } from 'context/todoContext/TodoContext';
import { toggleDoneStatus as toggleDoneStatusKeyDefinition } from 'constants/keyDefnitions';

export default function useToggleDoneStatusOnKeyPressed() {
    const { currentItem, isEditing, updateItem } = useTodoContext();

    useEffect(() => {
        if (!currentItem || isEditing) {
            return;
        }

        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                !checkKeyDefinitionIsPressed(
                    toggleDoneStatusKeyDefinition,
                    event,
                )
            ) {
                return;
            }

            // noinspection JSIgnoredPromiseFromCall
            updateItem(currentItem.id, {
                done: !currentItem.done,
            });
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [currentItem, isEditing, updateItem]);
}
