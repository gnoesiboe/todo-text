import React from 'react';
import Button from './components/Button';
import ButtonIcon from './components/ButtonIcon';
import useAddTodoOnButtonClick from './hooks/useAddTodoOnButtonClick';

const AddTodo: React.FC = () => {
    const { onClick } = useAddTodoOnButtonClick();

    return (
        <Button onClick={onClick}>
            <ButtonIcon />
        </Button>
    );
};

export default AddTodo;
