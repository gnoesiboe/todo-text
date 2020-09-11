import React, { useRef } from 'react';
import useTodoFormHandlers from './hooks/useTodoFormHandlers';
import type { TodoListItem } from '../../model/TodoListItem';
import useNavigateToNextItemOnDownKeyPressed from './hooks/useNavigateToNextItemOnDownKeyPressed';
import useNavigateToPreviousItemOnUpKeyPressed from './hooks/useNavigateToPreviousItemOnUpKeyPressed';
import useMoveItemUpOnKeyboardShortcutPressed from './hooks/useMoveItemUpOnKeyboardShortcutPressed';
import useMoveItemDownOnKeyboardShortcutPressed from './hooks/useMoveItemDownOnKeyboardShortcutPressed';
import useToggleDoneStatusOnKeyboardShortcut from './hooks/useToggleDoneStatusOnKeyboardShortcut';
import { Form, TextareaAutosize } from './components/StyledComponents';

export type OnChangeHandler = (newValue: string) => void;

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

    useNavigateToNextItemOnDownKeyPressed(textareaRef, item, value);
    useNavigateToPreviousItemOnUpKeyPressed(textareaRef, item, value);
    useMoveItemUpOnKeyboardShortcutPressed(item, value);
    useMoveItemDownOnKeyboardShortcutPressed(item, value);
    useToggleDoneStatusOnKeyboardShortcut(item, value);

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
