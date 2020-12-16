import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';
import { useTodoContext } from 'context/todoContext/TodoContext';
import { useEffect } from 'react';
import { moveCurrentItemUp as moveCurrentItemUpKeyDefinition } from 'constants/keyDefnitions';

export default function useMoveItemUpOnKeyboardShortcutPressed() {
    const { moveCurrentItemUp, isEditing } = useTodoContext();

    useEffect(() => {
        if (isEditing) {
            return;
        }

        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                !checkKeyDefinitionIsPressed(
                    moveCurrentItemUpKeyDefinition,
                    event,
                )
            ) {
                return;
            }

            event.preventDefault();

            moveCurrentItemUp();
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [moveCurrentItemUp, isEditing]);
}
