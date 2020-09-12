import React from 'react';
import TodoListItem from '../todoListItem/TodoListItem';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import useStartEditFirstOnKeyDown from './hooks/useStartEditFirstOnKeyDown';
import { Container, SavingIndicator } from './components/StyledComponents';

const TodoList: React.FC = () => {
    const { items, isFetching, isSaving, currentItem } = useTodoContext();

    useStartEditFirstOnKeyDown();

    return (
        <Container>
            {isSaving && <SavingIndicator>saving..</SavingIndicator>}
            <h1>TODO</h1>
            {isFetching ? (
                <p>Loading data from dropbox..</p>
            ) : (
                <>
                    {items.map((item) => (
                        <TodoListItem
                            key={item.id}
                            item={item}
                            current={currentItem === item.id}
                        />
                    ))}
                </>
            )}
        </Container>
    );
};

export default TodoList;
