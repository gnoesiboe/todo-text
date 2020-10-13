import {
    deleteItemInForm,
    stopEditWithoutSave,
    submitAndCreateNewItemAfterCurrent,
    submitAndCreateNewItemBeforeCurrent,
    submitItemForm,
} from './../../../constants/keyDefnitions';
import { checkKeyDefinitionIsPressed } from './../../../utility/keyboardNavigationUtilities';
import { isValidValue } from './../utility/inputValidator';
import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { TodoListItem } from './../../../model/TodoListItem';
import {
    useState,
    FormEventHandler,
    KeyboardEventHandler,
    FocusEventHandler,
} from 'react';

export default function useTodoFormHandlers(item: TodoListItem) {
    const [value, setValue] = useState<string>(item.value);

    const {
        deleteItem,
        saveValue,
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

        saveValue(item.id, newValue, item.done);
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
                saveValue(item.id, value, item.done);
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
                saveValue(item.id, value, item.done);
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
            stopEdit();
        }
    };

    const onValueChange: FormEventHandler<HTMLTextAreaElement> = (event) => {
        // @ts-ignore somehow the value prop is not present in typescript declaration
        const value = event.target.value;

        setValue(value);
    };

    const onValueBlur: FocusEventHandler<HTMLTextAreaElement> = () => {
        persistCurrentValue();
        stopEdit();
    };

    return { value, onSubmit, onValueKeyDown, onValueChange, onValueBlur };
}
