import { KeyCode } from './../../../constants/keyCodes';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { TodoListItem, Mode } from './../../../model/TodoListItem';
import {
    useState,
    FormEventHandler,
    KeyboardEventHandler,
    FocusEventHandler,
} from 'react';
import { NextAction } from '../../..//context/todoContext/hooks/useManageTodoListItems';

export default function useTodoFormHandlers(item: TodoListItem) {
    const [value, setValue] = useState<string>(item.value);

    const { deleteItem, changeItem, setItemMode } = useTodoContext();

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        handleSubmit(NextAction.EditNext);
    };

    const onDone = () => setItemMode(item.id, Mode.View);

    const handleSubmit = (nextAction: NextAction) => {
        const newValue = value.trim();

        if (newValue.length === 0) {
            deleteItem(item.id);
        }

        changeItem(item.id, newValue, item.done, nextAction);
    };

    const onValueKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        if (event.keyCode === KeyCode.Enter && event.shiftKey === false) {
            handleSubmit(NextAction.EditNext);

            event.preventDefault();
        }

        if (event.keyCode === KeyCode.Backspace && value.length <= 1) {
            deleteItem(item.id);
        }

        if (event.keyCode === KeyCode.Escape) {
            onDone();
        }
    };

    const onValueChange: FormEventHandler<HTMLTextAreaElement> = (event) => {
        // @ts-ignore somehow the value prop is not present in typescript declaration
        const value = event.target.value;

        setValue(value);
    };

    const onValueBlur: FocusEventHandler<HTMLTextAreaElement> = () => {
        handleSubmit(NextAction.None);
    };

    return { value, onSubmit, onValueKeyDown, onValueChange, onValueBlur };
}
