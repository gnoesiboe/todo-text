import { isHeading } from './../../../model/TodoListItem';
import type { TodoListItem } from '../../../model/TodoListItem';

const replaceDeletedSigns = (value: string) => {
    return value.replace(
        /~~([^~]+)~~/,
        '<span class="todo-list-item__value--removed">$1</span>',
    );
};

const applyLineBreaks = (value: string) => {
    return value.replace(/\n/g, '<br />');
};

const formatAsHeading = (value: string) => {
    return value.replace(
        /^# (.+)$/g,
        '<span class="todo-list-item__value--heading">$1</span>',
    );
};

export const prepareForVisibility = (item: TodoListItem): string => {
    if (isHeading(item)) {
        return formatAsHeading(item.value);
    }

    return replaceDeletedSigns(applyLineBreaks(item.value));
};
