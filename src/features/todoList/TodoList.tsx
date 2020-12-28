import React from 'react';
import TodoListItem from '../todoListItem/TodoListItem';
import { useTodoContext } from 'context/todoContext/TodoContext';
import SortButton from './components/SortButton';
import useNavigateToNextItemOnDownKeyPressed from './hooks/useNavigateToNextItemOnDownKeyPressed';
import useNavigateToPreviousItemOnUpKeyPressed from './hooks/useNavigateToPreviousItemOnUpKeyPressed';
import useMoveItemUpOnKeyboardShortcutPressed from './hooks/useMoveItemUpOnKeyboardShortcutPressed';
import useMoveItemDownOnKeyboardShortcutPressed from './hooks/useMoveItemDownOnKeyboardShortcutPressed';
import useClearCurrentOnKeyPressed from './hooks/useClearCurrentOnKeyPressed';
import useDeleteCurrentOnKeyPressed from './hooks/useDeleteCurrentOnKeyPressed';
import useToggleDoneStatusOnKeyPressed from './hooks/useToggleDoneStatusOnKeyPressed';
import usePreventScrollWithArrowKeys from './hooks/usePreventScrollWithArrowKeys';
import AddTodo, { ButtonType } from '../addTodo/AddTodo';
import FilterTodos from '../filterTodos/FilterTodos';
import useStartSortingWithKeyboardShortcut from './hooks/useStartSortingWithKeyboardShortcut';
import Container from './components/Container';
import {
    FetchingIndicator,
    SavingIndicator,
} from 'primitives/connectionIndicator/ConnectionIndicator';
import Header from './components/Header';
import Heading from './components/Heading';
import AddTodoContainer from './components/AddTodoContainer';
import OutsideClickHandler from 'react-outside-click-handler';
import useClearCurrentOnOutsideClick from './hooks/useClearCurrentOnOutsideClick';

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
    usePreventScrollWithArrowKeys();
    useStartSortingWithKeyboardShortcut();

    const onOutsideClick = useClearCurrentOnOutsideClick();

    const itemsToDisplay = isSorting ? items : filteredItems;

    return (
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
            <Container>
                {isSaving && <SavingIndicator />}
                {isFetching && <FetchingIndicator />}
                <Header>
                    <Heading>Tød□</Heading>
                    {!isSorting && (
                        <AddTodoContainer>
                            <AddTodo buttonType={ButtonType.Header} />
                        </AddTodoContainer>
                    )}

                    {isSorting ? (
                        <SortButton onClick={() => stopSorting()}>
                            done
                        </SortButton>
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
        </OutsideClickHandler>
    );
};

export default TodoList;
