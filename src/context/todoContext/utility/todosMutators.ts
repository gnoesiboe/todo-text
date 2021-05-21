import { determineNoteTodoStatus } from './todoListValueParser';
import {
    InexactDateInidicator,
    isBeforeToday,
    isExactDate,
    isToday,
    parseDate,
    transformInexactToExactDate,
} from 'utility/dateTimeUtilities';
import { splitAtLineBreak } from 'utility/stringUtilities';
import { TodoListItem, TodoListItemCollection } from 'model/TodoListItem';
import { emptyValue } from 'model/factory/todoListItemFactory';
import produce from 'immer';
import { isEqual } from 'lodash';
import { sortItemsByRank } from './sortingUtilities';

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

    return sortItemsByRank(incomingItems);
}

export function applyUpdate(
    currentItems: TodoListItemCollection,
    id: string,
    updates: Partial<TodoListItem>,
): TodoListItemCollection {
    return produce<TodoListItemCollection>(currentItems, (nextItems) => {
        const itemToChange = nextItems.find(
            (cursorItem) => cursorItem.id === id,
        );

        if (!itemToChange) {
            return;
        }

        const { value, ...otherUpdates } = updates;

        if (value) {
            itemToChange.value = value.trim() || emptyValue;
        }

        Object.keys(otherUpdates).forEach((property) => {
            // @ts-ignore → Typescript does not know that the property is a valid key for TodoListItem
            itemToChange[property] = otherUpdates[property];
        });

        transformDateIndicators(nextItems);

        return sortItemsByRank(nextItems);
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

export function applyCreateNewItem(
    currentItems: TodoListItemCollection,
    newItem: TodoListItem,
): TodoListItemCollection {
    const nextItems = sortItemsByRank([...currentItems, newItem]);

    const withUpdatedRanks = nextItems.map((cursorItem) => {
        if (cursorItem.id === newItem.id || cursorItem.rank < newItem.rank) {
            return cursorItem;
        }

        return {
            ...cursorItem,
            rank: cursorItem.rank + 1,
        };
    });

    return sortItemsByRank(withUpdatedRanks);
}

export function applyToggleSubItemDoneValueChange(
    currentValue: string,
    toggleItemIndex: number,
): string {
    const [summary, ...notes] = splitAtLineBreak(currentValue);

    let currentItemIndex = 0;

    const newNotes = notes.map((note) => {
        const todoStatus = determineNoteTodoStatus(note);

        if (todoStatus === null) {
            // not a todo list item

            return note;
        }

        if (currentItemIndex !== toggleItemIndex) {
            currentItemIndex++;

            return note;
        }

        const newNote = !todoStatus
            ? note.replace(/^([*-]{1,1}) \[ \]/, '$1 [x]')
            : note.replace(/^([*-]{1,1}) \[x\]/, '$1 [ ]');

        currentItemIndex++;

        return newNote;
    });

    return [summary, ...newNotes].join('\n');
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

        let augmentedSummaryLine: string;

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
