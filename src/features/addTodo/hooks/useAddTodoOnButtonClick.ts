import { useTodoContext } from 'context/todoContext/TodoContext';
import { MouseEventHandler } from 'react';

export default function useAddTodoOnButtonClick() {
    const {
        createNewItemAtTheStart,
        createNewItemAfterCurrent,
        isEditing,
        currentItemId,
    } = useTodoContext();

    const onClick: MouseEventHandler = () => {
        if (isEditing) {
            return;
        }

        if (currentItemId) {
            createNewItemAfterCurrent();
        } else {
            createNewItemAtTheStart();
        }
    };

    return { onClick };
}
