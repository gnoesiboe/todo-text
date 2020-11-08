import React from 'react';
import TodoListItem from '../todoListItem/TodoListItem';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import {
    Container,
    Header,
    Heading,
    SavingIdicator,
    FetchingIndicator,
    AddTodoContainer,
} from './components/StyledComponents';
import useNavigateToNextItemOnDownKeyPressed from './hooks/useNavigateToNextItemOnDownKeyPressed';
import useNavigateToPreviousItemOnUpKeyPressed from './hooks/useNavigateToPreviousItemOnUpKeyPressed';
import useMoveItemUpOnKeyboardShortcutPressed from './hooks/useMoveItemUpOnKeyboardShortcutPressed';
import useMoveItemDownOnKeyboardShortcutPressed from './hooks/useMoveItemDownOnKeyboardShortcutPressed';
import useClearCurrentOnKeyPressed from './hooks/useClearCurrentOnKeyPressed';
import useDeleteCurrentOnKeyPressed from './hooks/useDeleteCurrentOnKeyPressed';
import useToggleDoneStatusOnKeyPressed from './hooks/useToggleDoneStatusOnKeyPressed';
import useAddNewItemOnKeyboardShortcutPressed from './hooks/useAddNewItemOnKeyboardShortcutPressed';
import usePreventScrollWithArrowKeys from './hooks/usePreventScrollWithArrowKeys';
import AddTodo from '../addTodo/AddTodo';
import FilterTodos from '../filterTodos/FilterTodos';

const TodoList: React.FC = () => {
    const {
        filteredItems,
        isFetching,
        isSaving,
        currentItem,
    } = useTodoContext();

    useNavigateToNextItemOnDownKeyPressed();
    useNavigateToPreviousItemOnUpKeyPressed();
    useMoveItemUpOnKeyboardShortcutPressed();
    useMoveItemDownOnKeyboardShortcutPressed();
    useClearCurrentOnKeyPressed();
    useDeleteCurrentOnKeyPressed();
    useToggleDoneStatusOnKeyPressed();
    useAddNewItemOnKeyboardShortcutPressed();
    usePreventScrollWithArrowKeys();

    return (
        <Container>
            {isSaving && <SavingIdicator />}
            {isFetching && <FetchingIndicator />}
            <Header>
                <Heading>Tød□</Heading>
                <AddTodoContainer>
                    <AddTodo />
                </AddTodoContainer>
                <FilterTodos />
            </Header>
            {filteredItems.map((item, index) => (
                <TodoListItem
                    key={item.id}
                    index={index}
                    item={item}
                    current={currentItem === item.id}
                />
            ))}
        </Container>
    );
};

export default TodoList;
