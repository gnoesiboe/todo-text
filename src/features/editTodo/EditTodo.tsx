import React from 'react';
import './EditTodo.css';
import TextareaAutosize from 'react-autosize-textarea';
import useTodoFormHandlers from './hooks/useTodoFormHandlers';
import type { TodoListItem } from '../../model/TodoListItem';

export type OnChangeHandler = (newValue: string) => void;

type Props = {
    item: TodoListItem;
};

const EditTodo: React.FC<Props> = ({ item }) => {
    const {
        value,
        onSubmit,
        onValueKeyDown,
        onValueChange,
        onValueBlur,
    } = useTodoFormHandlers(item);

    return (
        <form onSubmit={onSubmit} className="edit-todo">
            <TextareaAutosize
                autoFocus
                value={value}
                className="edit-todo__textarea"
                rows={1}
                onKeyDown={onValueKeyDown}
                onChange={onValueChange}
                onBlur={onValueBlur}
            />
        </form>
    );
};

export default EditTodo;
