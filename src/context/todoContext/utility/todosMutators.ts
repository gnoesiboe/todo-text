import { NextAction } from './../hooks/useManageTodoListItems';
import { createEmpty } from '../../../model/factory/todoListItemFactory';
import { TodoListItem } from '../../../model/TodoListItem';
import produce from 'immer';
import { isEqual } from 'lodash';

export function applyNewlyFetched(
    currentItems: TodoListItem[],
    incomingItems: TodoListItem[],
): TodoListItem[] {
    // ensure that we do not end up in a refetch loop, as an === check tell's
    // react that there were changes, even when there are none, but only different
    // instances
    if (isEqual(currentItems, incomingItems)) {
        return currentItems;
    }

    return incomingItems;
}

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

        const normalizedValue =
            value && value.trim().length > 0 ? value : '...';

        nextItems[indexToChange].value = normalizedValue;
        nextItems[indexToChange].done = done;

        switch (nextAction) {
            case NextAction.EditNext:
                const nextIndex = indexToChange + 1;

                if (nextIndex >= nextItems.length) {
                    nextItems.push(createEmpty());
                }
                break;

            case NextAction.CreateNewAfter:
                const nextAfterIndex = indexToChange + 1;
                nextItems.splice(nextAfterIndex, 0, createEmpty());
                break;

            case NextAction.CreateNewBefore:
                nextItems.splice(indexToChange, 0, createEmpty());
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

        nextItems.splice(indexToDelete, 1);
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
