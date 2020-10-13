import React from 'react';
import TodoListItem from '../todoListItem/TodoListItem';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import { Container, ConnectionIndicator } from './components/StyledComponents';
import useToggleFilters from './hooks/useToggleFilters';
import { isWaiting } from '../../model/TodoListItem';
import FilterButton from '../../primitives/FilterButton/FilterButton';
import useNavigateToNextItemOnDownKeyPressed from './hooks/useNavigateToNextItemOnDownKeyPressed';
import useNavigateToPreviousItemOnUpKeyPressed from './hooks/useNavigateToPreviousItemOnUpKeyPressed';
import useMoveItemUpOnKeyboardShortcutPressed from './hooks/useMoveItemUpOnKeyboardShortcutPressed';
import useMoveItemDownOnKeyboardShortcutPressed from './hooks/useMoveItemDownOnKeyboardShortcutPressed';
import useClearCurrentOnKeyPressed from './hooks/useClearCurrentOnKeyPressed';
import useDeleteCurrentOnKeyPressed from './hooks/useDeleteCurrentOnKeyPressed';
import useToggleDoneStatusOnKeyPressed from './hooks/useToggleDoneStatusOnKeyPressed';

const TodoList: React.FC = () => {
    const { items, isFetching, isSaving, currentItem } = useTodoContext();

    const {
        hideWaiting,
        onHideWaitingClick,
        hideDone,
        onHideDoneClick,
    } = useToggleFilters();

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
                onClick={onHideWaitingClick}
                active={hideWaiting}
                title="hide waiting"
            />
            <FilterButton
                onClick={onHideDoneClick}
                active={hideDone}
                title="hide done"
            />
            {items.map((item, index) => (
                <TodoListItem
                    key={item.id}
                    index={index}
                    item={item}
                    current={currentItem === item.id}
                    hidden={
                        (isWaiting(item) && hideWaiting) ||
                        (item.done && hideDone)
                    }
                />
            ))}
        </Container>
    );
};

export default TodoList;
