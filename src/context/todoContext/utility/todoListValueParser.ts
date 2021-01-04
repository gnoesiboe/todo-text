import { ParsedTodoProgress } from './../../../model/TodoListItem';
import { splitAtLineBreak } from '../../../utility/stringUtilities';
import type {
    TodoListItem,
    TodoListItemCollection,
    ParsedTodoNote,
    ParsedTodoValue,
} from 'model/TodoListItem';
import { isAfterToday, parseDate } from 'utility/dateTimeUtilities';

const determineNoteTodoStatus = (note: string): boolean | null => {
    const match = note.match(/^[*-]{1,1} \[([ x]{1,1})\]/);

    if (!match) {
        return null;
    }

    const value = match[1] || null;

    if (value === null) {
        return null;
    }

    return value.trim() === 'x';
};

export const extractSnoozedDate = (summary: string): Date | null => {
    const match = summary.match(/@snoozeUntil\(([^)]+)\)/);

    if (!match) {
        return null;
    }

    const value = match[1];

    if (!value) {
        return null;
    }

    return parseDate(value);
};

const parseNote = (note: string): ParsedTodoNote => {
    const todoStatus = determineNoteTodoStatus(note);

    return {
        note,
        isTodo: todoStatus !== null,
        done: todoStatus,
    };
};

const determineProgress = (notes: ParsedTodoNote[]): ParsedTodoProgress => {
    let done = 0;
    let todo = 0;
    let total = 0;

    notes.forEach((note) => {
        if (!note.isTodo) {
            return;
        }

        if (note.done) {
            done++;
        } else {
            todo++;
        }

        total++;
    });

    return { done, todo, total };
};

export const parseTodoValue = (
    item: TodoListItem<string>,
): TodoListItem<ParsedTodoValue> => {
    const [summary, ...notes] = splitAtLineBreak(item.value);

    const isCancelled = !!summary.match(/^~~[^~]+~~$/);
    const isHeading = !!summary.match(/^# .*$/);
    const isWaiting = !!summary.match(/^.*@waiting/);

    const isActionable = !isWaiting && !isCancelled && !isHeading;

    const snoozedUntil = extractSnoozedDate(summary);
    const isSnoozed = snoozedUntil ? isAfterToday(snoozedUntil) : false;

    const parsedNotes = notes.map((note) => parseNote(note));

    const parsedValue: ParsedTodoValue = {
        raw: item.value,
        summary,
        notes: parsedNotes,
        progress: determineProgress(parsedNotes),
        isCancelled,
        isHeading,
        isMust: !!summary.match(/@must/),
        isWaiting,
        isQuickfix: !!summary.match(/^.*@quickfix/),
        snoozedUntil,
        isSnoozed,
        isEvening: !!summary.match(/^.*@evening/),
        isActionable,
    };

    return { ...item, value: parsedValue };
};

export const transformToParsedCollection = (
    items: TodoListItemCollection<string>,
): TodoListItemCollection<ParsedTodoValue> =>
    items.map((item) => parseTodoValue(item));
