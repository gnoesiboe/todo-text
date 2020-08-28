import { isBeingEdited } from './../../../model/TodoListItem';
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

        switch (nextAction) {
            case NextAction.EditNext:
                const nextIndex = indexToChange + 1;

                if (nextIndex >= nextItems.length) {
                    nextItems.push(createEmptyToEdit());
                } else {
                    nextItems[nextIndex].mode = Mode.Edit;
                }
                break;

            case NextAction.EditPrevious:
                const previousIndex = indexToChange - 1;

                if (previousIndex >= 0) {
                    nextItems[previousIndex].mode = Mode.Edit;
                }
                break;

            case NextAction.CreateNewAfter:
                nextItems.splice(indexToChange + 1, 0, createEmptyToEdit());
                break;

            case NextAction.CreateNewBefore:
                nextItems.splice(indexToChange, 0, createEmptyToEdit());
                break;

            default:
                // do nothing
                break;
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

export function applyEditNext(currentItems: TodoListItem[]): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const indexOfItemThatIsEdited = nextItems.findIndex((item) =>
            isBeingEdited(item),
        );

        if (indexOfItemThatIsEdited === -1) {
            return;
        }

        const nextIndex = indexOfItemThatIsEdited + 1;

        if (nextItems[nextIndex] === undefined) {
            return;
        }

        nextItems[indexOfItemThatIsEdited].mode = Mode.View;
        nextItems[nextIndex].mode = Mode.Edit;
    });
}

export function applyMoveItemUp(
    currentItems: TodoListItem[],
    id: string,
    value: string,
): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const indexOfItemToBeMoved = nextItems.findIndex(
            (item) => item.id === id,
        );

        if (indexOfItemToBeMoved === -1) {
            return;
        }

        const nextIndex = indexOfItemToBeMoved - 1;

        if (nextIndex < 0) {
            return;
        }

        // first extract item
        const extractedItem = nextItems.splice(indexOfItemToBeMoved, 1)[0];

        extractedItem.value = value;

        // then re-add it
        nextItems.splice(nextIndex, 0, extractedItem);
    });
}

export function applyMoveItemDown(
    currentItems: TodoListItem[],
    id: string,
    value: string,
): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const indexOfItemToBeMoved = nextItems.findIndex(
            (item) => item.id === id,
        );

        if (indexOfItemToBeMoved === -1) {
            return;
        }

        const nextIndex = indexOfItemToBeMoved + 1;

        if (nextItems[nextIndex] === undefined) {
            return;
        }

        // first extract item
        const extractedItem = nextItems.splice(indexOfItemToBeMoved, 1)[0];

        extractedItem.value = value;

        // then re-add it
        nextItems.splice(nextIndex, 0, extractedItem);
    });
}
