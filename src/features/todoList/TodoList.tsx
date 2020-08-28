import React from 'react';
import TodoListItem from '../todoListItem/TodoListItem';
import './TodoList.css';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import useStartEditFirstOnKeyDown from './hooks/useStartEditFirstOnKeyDown';
import SavingIndicator from './components/SavingIndicator';

const TodoList: React.FC = () => {
    const { items, isFetching, isSaving } = useTodoContext();

    useStartEditFirstOnKeyDown();

    return (
        <div className="todo-list">
            {isSaving && <SavingIndicator />}
            <h1>Todo</h1>
            {isFetching ? (
                <p>Loading data from dropbox..</p>
            ) : (
                <>
                    {items.map((item) => (
                        <TodoListItem item={item} key={item.id} />
                    ))}
                </>
            )}
        </div>
    );
};

export default TodoList;
