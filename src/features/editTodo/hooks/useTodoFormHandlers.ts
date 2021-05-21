import {
    deleteItemInForm,
    stopEditWithoutSave,
    submitAndCreateNewItemAfterCurrent,
    submitAndCreateNewItemBeforeCurrent,
    submitItemForm,
} from 'constants/keyDefnitions';
import { checkKeyDefinitionIsPressed } from 'utility/keyboardNavigationUtilities';
import { isValidValue } from './../utility/inputValidator';
import { useTodoContext } from 'context/todoContext/TodoContext';
import { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';
import {
    useState,
    FormEventHandler,
    KeyboardEventHandler,
    FocusEventHandler,
} from 'react';

export default function useTodoFormHandlers(
    item: TodoListItem<ParsedTodoValue>,
) {
    const [value, setValue] = useState<string>(item.value.raw);

    const {
        deleteItem,
        updateItem,
        stopEdit,
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
        startEdit,
    } = useTodoContext();

    const persistCurrentValue = () => {
        const newValue = value.trim();

        if (newValue.length === 0) {
            deleteItem(item.id);
        }

        // noinspection JSIgnoredPromiseFromCall
        updateItem(item.id, { value: newValue });
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (!isValidValue(value)) {
            return;
        }

        persistCurrentValue();
        stopEdit();
    };

    const onValueKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
        event,
    ) => {
        if (isValidValue(value)) {
            if (
                checkKeyDefinitionIsPressed(
                    submitAndCreateNewItemAfterCurrent,
                    event,
                )
            ) {
                // noinspection JSIgnoredPromiseFromCall
                updateItem(item.id, { value });

                stopEdit();
                createNewItemAfterCurrent();
                startEdit();
            }

            if (
                checkKeyDefinitionIsPressed(
                    submitAndCreateNewItemBeforeCurrent,
                    event,
                )
            ) {
                // noinspection JSIgnoredPromiseFromCall
                updateItem(item.id, { value });

                stopEdit();
                createNewItemBeforeCurrent();
                startEdit();
            }

            if (checkKeyDefinitionIsPressed(submitItemForm, event)) {
                persistCurrentValue();
                stopEdit();
            }
        }

        if (
            checkKeyDefinitionIsPressed(deleteItemInForm, event) &&
            value.length === 0
        ) {
            deleteItem(item.id);
        }

        if (checkKeyDefinitionIsPressed(stopEditWithoutSave, event)) {
            // ensure that we don't end up with an invalid value
            if (!isValidValue(value)) {
                deleteItem(item.id);
            }

            stopEdit();
        }
    };

    const onValueChange: FormEventHandler<HTMLTextAreaElement> = (event) => {
        // @ts-ignore somehow the value prop is not present in typescript declaration
        const newValue = event.target.value;

        setValue(newValue);
    };

    const onValueBlur: FocusEventHandler<HTMLTextAreaElement> = () => {
        if (!isValidValue(value)) {
            deleteItem(item.id);
        }

        persistCurrentValue();
        stopEdit();
    };

    return { value, onSubmit, onValueKeyDown, onValueChange, onValueBlur };
}
