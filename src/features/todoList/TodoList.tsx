import React from 'react';
import TodoListItem from '../todoListItem/TodoListItem';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import useStartEditFirstOnKeyDown from './hooks/useStartEditFirstOnKeyDown';
import { Container, ConnectionIndicator } from './components/StyledComponents';

const TodoList: React.FC = () => {
    const { items, isFetching, isSaving, currentItem } = useTodoContext();

    useStartEditFirstOnKeyDown();

    return (
        <Container>
            {isSaving && <ConnectionIndicator>saving..</ConnectionIndicator>}
            {isFetching && <ConnectionIndicator>loading..</ConnectionIndicator>}
            <h1>TODO</h1>
            {items.map((item, index) => (
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
