import { clearCurrentItem as clearCurrentItemKeyDefinition } from 'constants/keyDefnitions';
import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';
import { useEffect } from 'react';
import { useTodoContext } from 'context/todoContext/TodoContext';

export default function useClearCurrentOnKeyPressed() {
    const { isEditing, currentItemId, clearCurrentItem } = useTodoContext();

    useEffect(() => {
        if (!currentItemId || isEditing) {
            return;
        }

        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                !checkKeyDefinitionIsPressed(
                    clearCurrentItemKeyDefinition,
                    event,
                )
            ) {
                return;
            }

            clearCurrentItem();
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [isEditing, currentItemId, clearCurrentItem]);
}
