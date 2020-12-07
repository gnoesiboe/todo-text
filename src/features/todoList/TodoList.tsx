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
    SortButton,
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
        items,
        isFetching,
        isSaving,
        currentItem,
        isSorting,
        startSorting,
        stopSorting,
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

    const itemsToDisplay = isSorting ? items : filteredItems;

    return (
        <Container>
            {isSaving && <SavingIdicator />}
            {isFetching && <FetchingIndicator />}
            <Header>
                <Heading>Tød□</Heading>
                <AddTodoContainer>
                    <AddTodo />
                </AddTodoContainer>
                {isSorting ? (
                    <SortButton onClick={() => stopSorting()}>done</SortButton>
                ) : (
                    <>
                        <SortButton onClick={() => startSorting()}>
                            sort
                        </SortButton>
                        <FilterTodos />
                    </>
                )}
            </Header>
            {itemsToDisplay.map((item, index) => (
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
