import { splitAtLineBreak } from './../../utility/stringUtilities';
import { parseDate } from '../../utility/dateTimeUtilities';
import { TodoListItem } from './../TodoListItem';

export const extractSnoozedDate = (item: TodoListItem): Date | null => {
    const [summaryLine] = splitAtLineBreak(item.value);

    const match = summaryLine.match(/@snoozeUntil\(([^)]+)\)/);

    if (!match) {
        return null;
    }

    const value = match[1];

    if (!value) {
        return null;
    }

    return parseDate(value);
};
