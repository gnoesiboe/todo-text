import { useTodoContext } from 'context/todoContext/TodoContext';
import { MouseEventHandler } from 'react';

export default function useAddTodoOnButtonClick() {
    const { createNewItemAtTheStart, isEditing } = useTodoContext();

    const onClick: MouseEventHandler = (event) => {
        if (isEditing) {
            return;
        }

        // prevent click event from being caught by the MainContainer, wich
        // results in the current todo list item being lost.
        event.stopPropagation();

        createNewItemAtTheStart();
    };

    return { onClick };
}
