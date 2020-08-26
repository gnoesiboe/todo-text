import { NextAction } from './../hooks/useManageTodoListItems';
import { applyIsEditingAnItemSelector } from './../../../model/selectors/todoListItemSelectors';
import { createEmptyToEdit } from '../../../model/factory/todoListItemFactory';
import { TodoListItem, Mode } from '../../../model/TodoListItem';
import produce from 'immer';

export function applyUpdate(
    currentItems: TodoListItem[],
    id: string,
    value: string,
    done: boolean,
    nextAction: NextAction,
): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const indexToChange = nextItems.findIndex((item) => item.id === id);

        if (indexToChange === -1) {
            return;
        }

        nextItems[indexToChange].value = value;
        nextItems[indexToChange].done = done;
        nextItems[indexToChange].mode = Mode.View;

        if (nextAction === NextAction.EditNext) {
            const nextIndex = indexToChange + 1;

            if (nextIndex >= nextItems.length) {
                nextItems.push(createEmptyToEdit());
            } else {
                nextItems[nextIndex].mode = Mode.Edit;
            }
        }
    });
}

export function applyDelete(
    currentItems: TodoListItem[],
    id: string,
): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const indexToDelete = nextItems.findIndex((item) => item.id === id);

        if (indexToDelete === -1) {
            return;
        }

        const previousIndex = indexToDelete - 1;

        nextItems.splice(indexToDelete, 1);

        if (nextItems[previousIndex] !== undefined) {
            nextItems[previousIndex].mode = Mode.Edit;
        }
    });
}

export function applyModeChange(
    currentItems: TodoListItem[],
    id: string,
    mode: Mode,
): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const item = nextItems.find((item) => item.id === id);

        if (!item) {
            return;
        }

        item.mode = mode;
    });
}

export function applyEditFirst(currentItems: TodoListItem[]): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        if (applyIsEditingAnItemSelector(nextItems) || nextItems.length === 0) {
            return;
        }

        nextItems[0].mode = Mode.Edit;
    });
}
