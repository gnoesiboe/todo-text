import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { MouseEventHandler } from 'react';

export default function useAddTodoOnButtonClick() {
    const { createNewItemAtTheStart, isEditing } = useTodoContext();

    const onClick: MouseEventHandler = () => {
        if (isEditing) {
            return;
        }

        createNewItemAtTheStart();
    };

    return { onClick };
}
