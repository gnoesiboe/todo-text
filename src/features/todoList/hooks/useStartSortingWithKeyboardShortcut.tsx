import { useEffect } from 'react';
import { toggleSortingItems } from 'constants/keyDefnitions';
import { useTodoContext } from 'context/todoContext/TodoContext';
import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';

export default function useStartSortingWithKeyboardShortcut() {
    const { isSorting, startSorting, stopSorting } = useTodoContext();

    useEffect(() => {
        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (!checkKeyDefinitionIsPressed(toggleSortingItems, event)) {
                return;
            }

            event.preventDefault();

            isSorting ? stopSorting() : startSorting();
        };

        window.addEventListener('keyup', onKeyUp);

        return () => window.removeEventListener('keyup', onKeyUp);
    }, [isSorting, startSorting, stopSorting]);
}
