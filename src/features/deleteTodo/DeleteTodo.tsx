import { XIcon } from '@primer/octicons-react';
import React from 'react';
import { TodoListItem } from '../../model/TodoListItem';
import { Button } from './components/StyledComponents';
import useDeleteTodoOnClick from './hooks/useDeleteTodoOnClick';

type Props = {
    item: TodoListItem;
};

const DeleteTodo: React.FC<Props> = ({ item }) => {
    const { onClick } = useDeleteTodoOnClick(item);

    return (
        <Button onClick={onClick}>
            <XIcon />
        </Button>
    );
};

export default DeleteTodo;
