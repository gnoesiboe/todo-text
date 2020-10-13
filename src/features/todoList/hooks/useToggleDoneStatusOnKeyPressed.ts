import { checkKeyDefinitionIsPressed } from './../../../utility/keyboardNavigationUtilities';
import { useEffect } from 'react';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { toggleDoneStatus as toggleDoneStatusKeyDefinition } from '../../../constants/keyDefnitions';

export default function useToggleDoneStatusOnKeyPressed() {
    const { currentItem, isEditing, toggleDoneStatus } = useTodoContext();

    useEffect(() => {
        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (
                !checkKeyDefinitionIsPressed(
                    toggleDoneStatusKeyDefinition,
                    event,
                )
            ) {
                return;
            }

            toggleDoneStatus();
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [currentItem, isEditing, toggleDoneStatus]);
}
