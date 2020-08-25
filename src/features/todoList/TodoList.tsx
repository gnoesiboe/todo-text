import React from 'react';
import TodoListItem from '../todoListItem/TodoListItem';
import './TodoList.css';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import useStartEditFirstOnKeyDown from './hooks/useStartEditFirstOnKeyDown';

const TodoList: React.FC = () => {
    const { items } = useTodoContext();

    useStartEditFirstOnKeyDown();

    return (
        <div className="todo-list">
            <h1>Todo</h1>
            {items.map((item) => (
                <TodoListItem item={item} key={item.id} />
            ))}
        </div>
    );
};

export default TodoList;
