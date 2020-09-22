import React from 'react';
import TodoListItem from '../todoListItem/TodoListItem';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import useStartEditFirstOnKeyDown from './hooks/useStartEditFirstOnKeyDown';
import { Container, ConnectionIndicator } from './components/StyledComponents';
import useToggleFilters from './hooks/useToggleFilters';
import { isWaiting } from '../../model/TodoListItem';
import { FilterButton } from './components/StyledComponents';

const TodoList: React.FC = () => {
    const { items, isFetching, isSaving, currentItem } = useTodoContext();

    const { hideWaiting, onHideWaitingClick } = useToggleFilters();

    useStartEditFirstOnKeyDown();

    return (
        <Container>
            {isSaving && <ConnectionIndicator>saving..</ConnectionIndicator>}
            {isFetching && <ConnectionIndicator>loading..</ConnectionIndicator>}
            <h1>TODO</h1>
            <FilterButton onClick={onHideWaitingClick} active={hideWaiting}>
                {hideWaiting ? 'show' : 'hide'} waiting
            </FilterButton>
            {items.map((item, index) => (
                <TodoListItem
                    key={item.id}
                    index={index}
                    item={item}
                    current={currentItem === item.id}
                    hidden={isWaiting(item) && hideWaiting}
                />
            ))}
        </Container>
    );
};

export default TodoList;
