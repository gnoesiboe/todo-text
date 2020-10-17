import React from 'react';
import { Button, Icon } from './components/StyledComponents';
import useAddTodoOnButtonClick from './hooks/useAddTodoOnButtonClick';

const AddTodo: React.FC = () => {
    const { onClick } = useAddTodoOnButtonClick();

    return (
        <Button onClick={onClick}>
            <Icon />
        </Button>
    );
};

export default AddTodo;
