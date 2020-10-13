import { checkKeyDefinitionIsPressed } from './../../../utility/keyboardNavigationUtilities';
import { useEffect } from 'react';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { deleteCurrentItem } from '../../../constants/keyDefnitions';
export default function useDeleteCurrentOnKeyPressed() {
    const { currentItem, isEditing, deleteItem } = useTodoContext();

    useEffect(() => {
        if (!currentItem || isEditing) {
            return;
        }

        const onKeyUp = (event: WindowEventMap['keyup']) => {
            if (!checkKeyDefinitionIsPressed(deleteCurrentItem, event)) {
                return;
            }

            if (window.confirm('Alre you sure?')) {
                deleteItem(currentItem);
            }
        };

        window.addEventListener('keyup', onKeyUp);

        return () => {
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [currentItem, isEditing, deleteItem]);
}
