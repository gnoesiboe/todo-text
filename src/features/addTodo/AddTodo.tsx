import React from 'react';
import HeaderButton from './components/HeaderButton';
import ButtonIcon from './components/ButtonIcon';
import useAddNewItemOnKeyboardShortcutPressed from './hooks/useAddNewItemOnKeyboardShortcutPressed';
import useAddTodoOnButtonClick from './hooks/useAddTodoOnButtonClick';
import TodoActionButton from 'primitives/todoActionButtons/TodoActionButton';

export enum ButtonType {
    Header,
    TodoAction,
}

type Props = {
    buttonType: ButtonType;
};

const AddTodo: React.FC<Props> = ({ buttonType }) => {
    const { onClick } = useAddTodoOnButtonClick();

    useAddNewItemOnKeyboardShortcutPressed();

    if (buttonType === ButtonType.Header) {
        return (
            <HeaderButton onClick={onClick}>
                <ButtonIcon />
            </HeaderButton>
        );
    }

    if (buttonType === ButtonType.TodoAction) {
        return <TodoActionButton onClick={onClick}>new below</TodoActionButton>;
    }

    throw new Error('Should not get to this point');
};

export default AddTodo;
