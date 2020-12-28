import { useTodoContext } from 'context/todoContext/TodoContext';
import { MouseEventHandler } from 'react';

export default function useAddTodoOnButtonClick() {
    const {
        createNewItemAtTheStart,
        createNewItemAfterCurrent,
        isEditing,
        currentItem,
    } = useTodoContext();

    const onClick: MouseEventHandler = () => {
        if (isEditing) {
            return;
        }

        if (currentItem) {
            createNewItemAfterCurrent();
        } else {
            createNewItemAtTheStart();
        }
    };

    return { onClick };
}
