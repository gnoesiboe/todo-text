import React from 'react';
import { deleteCurrentItem } from '../../constants/keyDefnitions';
import { TodoListItem } from '../../model/TodoListItem';
import TodoActionButton from '../../primitives/todoActionButtons/TodoActionButton';
import useDeleteTodoOnClick from './hooks/useDeleteTodoOnClick';

type Props = {
    item: TodoListItem;
    visible: boolean;
};

const DeleteTodo: React.FC<Props> = ({ item, visible }) => {
    const { onClick } = useDeleteTodoOnClick(item);

    return (
        <TodoActionButton
            disabled={visible}
            onClick={onClick}
            title={`Delete todo (keyboard shortcut: ${deleteCurrentItem.description})`}
        >
            delete
        </TodoActionButton>
    );
};

export default DeleteTodo;
