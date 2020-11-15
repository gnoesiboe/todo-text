import React, { useRef } from 'react';
import useTodoFormHandlers from './hooks/useTodoFormHandlers';
import type { TodoListItem } from '../../model/TodoListItem';
import {
    Form,
    SubmitButton,
    CancelButton,
    TextareaAutosize,
} from './components/StyledComponents';
import useSuggestTags from './hooks/useSuggestTags';

type Props = {
    item: TodoListItem;
    onCancel: () => void;
};

const EditTodo: React.FC<Props> = ({ item, onCancel }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const {
        value,
        onSubmit,
        onValueKeyDown,
        onValueChange,
        onValueBlur,
    } = useTodoFormHandlers(item);

    useSuggestTags(textareaRef);

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
            <SubmitButton type="submit">Save</SubmitButton>
            <CancelButton
                type="submit"
                variant="link"
                onClick={() => onCancel()}
            >
                Cancel
            </CancelButton>
        </Form>
    );
};

export default EditTodo;
