import { checkKeyDefinitionIsPressed } from './../../../utility/keyboardNavigationUtilities';
import { useTodoContext } from '../../../context/todoContext/TodoContext';
import { useEffect } from 'react';
import { moveCurrentItemDown as moveCurrentItemDownKeyDefinition } from '../../../constants/keyDefnitions';

export default function useMoveItemDownOnKeyboardShortcutPressed() {
    const { moveCurrentItemDown, isEditing } = useTodoContext();

    useEffect(() => {
        if (isEditing) {
            return;
        }

        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                !checkKeyDefinitionIsPressed(
                    moveCurrentItemDownKeyDefinition,
                    event,
                )
            ) {
                return;
            }

            event.preventDefault();

            moveCurrentItemDown();
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [moveCurrentItemDown, isEditing]);
}
