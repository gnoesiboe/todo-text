import React, { useRef } from 'react';
import useTodoFormHandlers from './hooks/useTodoFormHandlers';
import type { TodoListItem } from 'model/TodoListItem';
import useSuggestTags from './hooks/useSuggestTags';
import { submitItemForm, stopEditWithoutSave } from 'constants/keyDefnitions';
import Form from './components/Form';
import Textarea from './components/Textarea';
import SubmitButton from './components/SubmitButton';
import CancelButton from './components/CancelButton';

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
            <Textarea
                ref={textareaRef}
                autoFocus
                value={value}
                rows={1}
                onKeyDown={onValueKeyDown}
                onChange={onValueChange}
                onBlur={onValueBlur}
            />
            <SubmitButton
                type="submit"
                title={`Save changes (keyboard shortcut: ${submitItemForm.description})`}
            >
                Save
            </SubmitButton>
            <CancelButton
                type="submit"
                variant="link"
                title={`Cancel changes (keyboard shortcut: ${stopEditWithoutSave.description}))`}
                onClick={() => onCancel()}
            >
                Cancel
            </CancelButton>
        </Form>
    );
};

export default EditTodo;
