import { useTodoContext } from 'context/todoContext/TodoContext';
import { MouseEventHandler } from 'react';

export default function useAddTodoOnButtonClick() {
    const {
        createNewItemAtTheStart,
        createNewItemAfterCurrent,
        isEditing,
        currentItem,
    } = useTodoContext();

    const onClick: MouseEventHandler = (event) => {
        if (isEditing) {
            return;
        }

        // prevent click event from being caught by the MainContainer, wich
        // results in the current todo list item being lost.
        event.stopPropagation();

        if (currentItem) {
            createNewItemAfterCurrent();
        } else {
            createNewItemAtTheStart();
        }
    };

    return { onClick };
}
