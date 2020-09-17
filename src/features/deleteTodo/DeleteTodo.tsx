import { XIcon } from '@primer/octicons-react';
import React from 'react';
import useIsTouchDevice from '../../hooks/useIsTouchDevice';
import { TodoListItem } from '../../model/TodoListItem';
import { Button } from './components/StyledComponents';
import useDeleteTodoOnClick from './hooks/useDeleteTodoOnClick';

type Props = {
    item: TodoListItem;
};

const DeleteTodo: React.FC<Props> = ({ item }) => {
    const { onClick } = useDeleteTodoOnClick(item);

    const isTouchDevice = useIsTouchDevice(false);

    return (
        <Button onClick={onClick} isTouchDevice={isTouchDevice}>
            <XIcon />
        </Button>
    );
};

export default DeleteTodo;
