import { XIcon } from '@primer/octicons-react';
import React from 'react';
import { TodoListItem } from '../../model/TodoListItem';
import { Button } from './components/StyledComponents';
import useDeleteTodoOnClick from './hooks/useDeleteTodoOnClick';

type Props = {
    item: TodoListItem;
    visible: boolean;
};

const DeleteTodo: React.FC<Props> = ({ item, visible }) => {
    const { onClick } = useDeleteTodoOnClick(item);

    return (
        <Button onClick={onClick} visible={visible}>
            <XIcon />
        </Button>
    );
};

export default DeleteTodo;
