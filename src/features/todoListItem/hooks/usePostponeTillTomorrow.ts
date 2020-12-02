import { useTodoContext } from './../../../context/todoContext/TodoContext';
import { splitAtLineBreak } from './../../../utility/stringUtilities';
import { TodoListItem } from './../../../model/TodoListItem';

export default function usePostponeTillTomorrow(
    item: TodoListItem,
    current: boolean,
) {
    const { saveValue } = useTodoContext();

    const onTomorrowClick = () => {
        if (!current) {
            return;
        }

        const [summaryLine, ...otherLines] = splitAtLineBreak(item.value);

        let augmentedSummaryLine = summaryLine;

        // if already snoozed, remove snoozed line first
        augmentedSummaryLine = summaryLine.replace(
            /@snoozeUntil\([^)]+\)/g,
            '',
        );

        // add new snooze tag
        augmentedSummaryLine += ' @snoozeUntil(tomorrow)';

        const newValue = [augmentedSummaryLine, ...otherLines].join('\n');

        saveValue(item.id, newValue, item.done);
    };

    return { onTomorrowClick };
}
