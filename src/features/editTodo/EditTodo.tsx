import React, { useRef } from 'react';
import useTodoFormHandlers from './hooks/useTodoFormHandlers';
import type { TodoListItem } from '../../model/TodoListItem';
import { Form, TextareaAutosize } from './components/StyledComponents';

type Props = {
    item: TodoListItem;
};

const EditTodo: React.FC<Props> = ({ item }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const {
        value,
        onSubmit,
        onValueKeyDown,
        onValueChange,
        onValueBlur,
    } = useTodoFormHandlers(item);

    return (
        <Form onSubmit={onSubmit}>
            <TextareaAutosize
                ref={textareaRef}
                autoFocus
                value={value}
                rows={1}
                onKeyDown={onValueKeyDown}
                onChange={onValueChange}
                onBlur={onValueBlur}
            />
        </Form>
    );
};

export default EditTodo;
