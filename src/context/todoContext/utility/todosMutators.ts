import { transformInexactToExactDate } from './../../../utility/dateTimeUtilities';
import { isActionable } from './../../../model/TodoListItem';
import { createEmpty } from './../../../model/factory/todoListItemFactory';
import { TodoListItem } from '../../../model/TodoListItem';
import produce from 'immer';
import { isEqual } from 'lodash';
import { isExactDate } from '../../../utility/dateTimeUtilities';

const transformDateIndicators = (items: TodoListItem[]) => {
    items.forEach((item) => {
        const match = item.value.match(/@snooze\(([^)]+)\)/);

        if (!match) {
            return;
        }

        const value = match[1];

        if (!value || isExactDate(value)) {
            return;
        }

        const newValue = transformInexactToExactDate(value);

        item.value = item.value.replace(
            /@snooze\([^)]+\)/g,
            `@snooze(${newValue})`,
        );
    });
};

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

    transformDateIndicators(incomingItems);

    return incomingItems;
}

export function applyUpdate(
    currentItems: TodoListItem[],
    id: string,
    value: string,
    done: boolean,
): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const indexToChange = nextItems.findIndex((item) => item.id === id);

        if (indexToChange === -1) {
            return;
        }

        const normalizedValue =
            value && value.trim().length > 0 ? value.trim() : '...';

        nextItems[indexToChange].value = normalizedValue;
        nextItems[indexToChange].done = done;

        transformDateIndicators(nextItems);
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

        transformDateIndicators(nextItems);
    });
}

export function applyMoveCurrentItemUp(
    currentItems: TodoListItem[],
    currentId: string | null,
): TodoListItem[] {
    if (!currentId) {
        return currentItems;
    }

    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const indexOfItemToBeMoved = nextItems.findIndex(
            (item) => item.id === currentId,
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

        // then re-add it
        nextItems.splice(nextIndex, 0, extractedItem);
    });
}

export function applyMoveCurrentItemDown(
    currentItems: TodoListItem[],
    currentId: string | null,
): TodoListItem[] {
    if (!currentId) {
        return currentItems;
    }

    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const indexOfItemToBeMoved = nextItems.findIndex(
            (item) => item.id === currentId,
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

        // then re-add it
        nextItems.splice(nextIndex, 0, extractedItem);
    });
}

export function applyMoveToIndex(
    currentItems: TodoListItem[],
    previousIndex: number,
    nextIndex: number,
): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        if (!currentItems[previousIndex]) {
            return currentItems;
        }

        const itemToMove = nextItems.splice(previousIndex, 1)[0];

        nextItems.splice(nextIndex, 0, itemToMove);
    });
}

export function applyCreateNewItemAtTheStart(
    currentItems: TodoListItem[],
    id: string,
): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        nextItems.splice(0, 0, createEmpty(id));
    });
}

export function applyCreateNewItemAfter(
    currentItems: TodoListItem[],
    currentItemId: string,
    id: string,
): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const currentIndex = nextItems.findIndex(
            (item) => item.id === currentItemId,
        );

        if (currentIndex === -1) {
            return;
        }

        nextItems.splice(currentIndex + 1, 0, createEmpty(id));
    });
}

export function applyCreateNewItemBefore(
    currentItems: TodoListItem[],
    currentItemId: string,
    id: string,
): TodoListItem[] {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const currentIndex = nextItems.findIndex(
            (item) => item.id === currentItemId,
        );

        if (currentIndex === -1) {
            return;
        }

        nextItems.splice(currentIndex, 0, createEmpty(id));
    });
}

export function applyToggleDoneStatus(
    currentItems: TodoListItem[],
    currentItemId: string,
) {
    return produce<TodoListItem[]>(currentItems, (nextItems) => {
        const currentItem = nextItems.find((item) => item.id === currentItemId);

        if (!currentItem) {
            return;
        }

        if (!isActionable(currentItem)) {
            return;
        }

        currentItem.done = !currentItem.done;
    });
}
