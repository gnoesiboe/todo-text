import React from 'react';
import TodoListItem from '../todoListItem/TodoListItem';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import { Container, ConnectionIndicator } from './components/StyledComponents';
import FilterButton from '../../primitives/FilterButton/FilterButton';
import useNavigateToNextItemOnDownKeyPressed from './hooks/useNavigateToNextItemOnDownKeyPressed';
import useNavigateToPreviousItemOnUpKeyPressed from './hooks/useNavigateToPreviousItemOnUpKeyPressed';
import useMoveItemUpOnKeyboardShortcutPressed from './hooks/useMoveItemUpOnKeyboardShortcutPressed';
import useMoveItemDownOnKeyboardShortcutPressed from './hooks/useMoveItemDownOnKeyboardShortcutPressed';
import useClearCurrentOnKeyPressed from './hooks/useClearCurrentOnKeyPressed';
import useDeleteCurrentOnKeyPressed from './hooks/useDeleteCurrentOnKeyPressed';
import useToggleDoneStatusOnKeyPressed from './hooks/useToggleDoneStatusOnKeyPressed';

const TodoList: React.FC = () => {
    const {
        filteredItems,
        isFetching,
        isSaving,
        currentItem,
        hideDone,
        hideNotActionable,
        toggleHideDone,
        toggleHideNotActionable,
    } = useTodoContext();

    useNavigateToNextItemOnDownKeyPressed();
    useNavigateToPreviousItemOnUpKeyPressed();
    useMoveItemUpOnKeyboardShortcutPressed();
    useMoveItemDownOnKeyboardShortcutPressed();
    useClearCurrentOnKeyPressed();
    useDeleteCurrentOnKeyPressed();
    useToggleDoneStatusOnKeyPressed();

    return (
        <Container>
            {isSaving && <ConnectionIndicator>saving..</ConnectionIndicator>}
            {isFetching && <ConnectionIndicator>loading..</ConnectionIndicator>}
            <h1>TODO</h1>
            <FilterButton
                onClick={() => toggleHideNotActionable()}
                active={hideNotActionable}
                title="hide not-actionable"
            />
            <FilterButton
                onClick={() => toggleHideDone()}
                active={hideDone}
                title="hide done"
            />
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
