import { useTodoContext } from '../../../context/todoContext/TodoContext';
import { splitAtLineBreak } from '../../../utility/stringUtilities';
import { TodoListItem } from '../../../model/TodoListItem';

const applySnoozeTagToValue = (oldValue: string, snoozeTag: string): string => {
    const [summaryLine, ...otherLines] = splitAtLineBreak(oldValue);

    let augmentedSummaryLine = summaryLine;

    // if already snoozed, remove snoozed line first
    augmentedSummaryLine = summaryLine.replace(/@snoozeUntil\([^)]+\)/g, '');

    // add new snooze tag
    augmentedSummaryLine += ` @snoozeUntil(${snoozeTag})`;

    return [augmentedSummaryLine, ...otherLines].join('\n');
};

export default function usePostpone(item: TodoListItem, current: boolean) {
    const { saveValue } = useTodoContext();

    const onTomorrowClick = () => {
        if (!current) {
            return;
        }

        const newValue = applySnoozeTagToValue(item.value, 'tomorrow');

        saveValue(item.id, newValue, item.done);
    };

    const onNextWeekClick = () => {
        if (!current) {
            return;
        }

        const newValue = applySnoozeTagToValue(item.value, 'next week');

        saveValue(item.id, newValue, item.done);
    };

    return { onTomorrowClick, onNextWeekClick };
}