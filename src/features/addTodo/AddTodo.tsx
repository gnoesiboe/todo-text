import React from 'react';
import AddTodoButton from './components/AddTodoButton';
import { AddTodoIcon } from './components/AddTodoIcon';
import useAddTodoOnButtonClick from './hooks/useAddTodoOnButtonClick';

const AddTodo: React.FC = () => {
    const { onClick } = useAddTodoOnButtonClick();

    return (
        <AddTodoButton onClick={onClick}>
            <AddTodoIcon />
        </AddTodoButton>
    );
};

export default AddTodo;
