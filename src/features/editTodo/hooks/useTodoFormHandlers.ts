import { checkOnlyKeyCodeIsPressed } from './../../../utility/keyboardNavigationUtilities';
import { KeyCode } from './../../../constants/keyCodes';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { TodoListItem } from './../../../model/TodoListItem';
import {
    useState,
    FormEventHandler,
    KeyboardEventHandler,
    FocusEventHandler,
} from 'react';
import { NextAction } from '../../..//context/todoContext/hooks/useManageTodoListItems';

export default function useTodoFormHandlers(item: TodoListItem) {
    const [value, setValue] = useState<string>(item.value);

    const { deleteItem, changeItem, clearEditMode } = useTodoContext();

    const pushNewValue = (nextAction: NextAction) => {
        const newValue = value.trim();

        if (newValue.length === 0) {
            deleteItem(item.id);
        }

        changeItem(item.id, newValue, item.done, nextAction);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        pushNewValue(NextAction.EditNext);
    };

    const onValueKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        if (checkOnlyKeyCodeIsPressed(event, KeyCode.Enter)) {
            pushNewValue(NextAction.EditNext);

            event.preventDefault();
        }

        if (event.keyCode === KeyCode.Enter && event.altKey) {
            if (event.shiftKey) {
                pushNewValue(NextAction.CreateNewBefore);
            } else {
                pushNewValue(NextAction.CreateNewAfter);
            }
        }

        if (event.keyCode === KeyCode.Enter && event.ctrlKey) {
            pushNewValue(NextAction.None);
        }

        if (
            checkOnlyKeyCodeIsPressed(event, KeyCode.Backspace) &&
            value.length <= 1
        ) {
            deleteItem(item.id);
        }

        if (checkOnlyKeyCodeIsPressed(event, KeyCode.Escape)) {
            clearEditMode();
        }
    };

    const onValueChange: FormEventHandler<HTMLTextAreaElement> = (event) => {
        // @ts-ignore somehow the value prop is not present in typescript declaration
        const value = event.target.value;

        setValue(value);
    };

    const onValueBlur: FocusEventHandler<HTMLTextAreaElement> = () => {
        pushNewValue(NextAction.None);
    };

    return { value, onSubmit, onValueKeyDown, onValueChange, onValueBlur };
}
