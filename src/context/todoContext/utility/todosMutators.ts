import { parseTodoValue } from './todoListValueParser';
import { InexactDateInidicator } from 'utility/dateTimeUtilities';
import { splitAtLineBreak } from 'utility/stringUtilities';
import { TodoListItemCollection } from 'model/TodoListItem';
import { emptyValue } from 'model/factory/todoListItemFactory';
import {
    parseDate,
    transformInexactToExactDate,
    isBeforeToday,
    isToday,
} from 'utility/dateTimeUtilities';
import { createEmpty } from 'model/factory/todoListItemFactory';
import produce from 'immer';
import { isEqual } from 'lodash';
import { isExactDate } from 'utility/dateTimeUtilities';

const transformDateIndicators = (items: TodoListItemCollection) => {
    items.forEach((item) => {
        const match = item.value.match(/@snoozeUntil\(([^)]+)\)/);

        if (!match) {
            return;
        }

        const value = match[1] as InexactDateInidicator;

        if (!value) {
            return;
        }

        if (isExactDate(value)) {
            const date = parseDate(value);

            if (!date) {
                return;
            }

            if (isBeforeToday(date) || isToday(date)) {
                item.value = item.value.replace(/@snoozeUntil\([^)]+\)/g, '');
            }

            return;
        }

        const newValue = transformInexactToExactDate(value);

        item.value = item.value.replace(
            /@snoozeUntil\([^)]+\)/g,
            `@snoozeUntil(${newValue})`,
        );
    });
};

export function applyNewlyFetched(
    currentItems: TodoListItemCollection,
    incomingItems: TodoListItemCollection,
): TodoListItemCollection {
    // ensure that we do not end up in a refetch loop, as an === check tell's
    // React that there were changes, even when there might be none as there
    // might be different instances with the same values.
    if (isEqual(currentItems, incomingItems)) {
        return currentItems;
    }

    transformDateIndicators(incomingItems);

    return incomingItems;
}

export function applyUpdate(
    currentItems: TodoListItemCollection,
    id: string,
    value: string,
    done: boolean,
): TodoListItemCollection {
    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
        const indexToChange = nextItems.findIndex((item) => item.id === id);

        if (indexToChange === -1) {
            return;
        }

        // fallback to ensure that no empty todo list items occur. This should
        // however never occur
        const normalizedValue = value.trim() || emptyValue;

        nextItems[indexToChange].value = normalizedValue;
        nextItems[indexToChange].done = done;

        transformDateIndicators(nextItems);
    });
}

export function applyDelete(
    currentItems: TodoListItemCollection,
    id: string,
): TodoListItemCollection {
    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
        const indexToDelete = nextItems.findIndex((item) => item.id === id);

        if (indexToDelete === -1) {
            return;
        }

        nextItems.splice(indexToDelete, 1);

        transformDateIndicators(nextItems);
    });
}

export function applyMoveCurrentItemUp(
    currentItems: TodoListItemCollection,
    currentId: string | null,
): TodoListItemCollection {
    if (!currentId) {
        return currentItems;
    }

    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
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
    currentItems: TodoListItemCollection,
    currentId: string | null,
): TodoListItemCollection {
    if (!currentId) {
        return currentItems;
    }

    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
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
    currentItems: TodoListItemCollection,
    previousIndex: number,
    nextIndex: number,
): TodoListItemCollection {
    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
        if (!currentItems[previousIndex]) {
            return currentItems;
        }

        const itemToMove = nextItems.splice(previousIndex, 1)[0];

        nextItems.splice(nextIndex, 0, itemToMove);
    });
}

export function applyCreateNewItemAtTheStart(
    currentItems: TodoListItemCollection,
    id: string,
): TodoListItemCollection {
    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
        nextItems.splice(0, 0, createEmpty(id));
    });
}

export function applyCreateNewItemAfter(
    currentItems: TodoListItemCollection,
    currentItemId: string,
    id: string,
): TodoListItemCollection {
    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
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
    currentItems: TodoListItemCollection,
    currentItemId: string,
    id: string,
): TodoListItemCollection {
    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
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
    currentItems: TodoListItemCollection,
    currentItemId: string,
) {
    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
        const newCurrentItem = nextItems.find(
            (item) => item.id === currentItemId,
        );

        if (!newCurrentItem) {
            return;
        }

        if (!parseTodoValue(newCurrentItem).value.isActionable) {
            return;
        }

        newCurrentItem.done = !newCurrentItem.done;
    });
}

export function applySnoozeItemUntil(
    currentItems: TodoListItemCollection,
    currentItemId: string,
    until: InexactDateInidicator,
) {
    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
        const nextCurrentItem = nextItems.find(
            (item) => item.id === currentItemId,
        );

        if (!nextCurrentItem) {
            return;
        }

        const [summaryLine, ...otherLines] = splitAtLineBreak(
            nextCurrentItem.value,
        );

        let augmentedSummaryLine = summaryLine;

        // if already snoozed, remove snoozed line first
        augmentedSummaryLine = summaryLine.replace(
            /@snoozeUntil\([^)]+\)/g,
            '',
        );

        // add new snooze tag
        augmentedSummaryLine += ` @snoozeUntil(${until})`;

        nextCurrentItem.value = [augmentedSummaryLine, ...otherLines].join(
            '\n',
        );

        transformDateIndicators(nextItems);
    });
}
