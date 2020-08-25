import { isHeading } from './../../../model/TodoListItem';
import type { TodoListItem } from '../../../model/TodoListItem';

const applyStrikeThrough = (value: string) => {
    return value.replace(
        /~~([^~]+)~~/,
        '<span class="todo-list-item__value--removed">$1</span>',
    );
};

const applyLineBreaks = (value: string) => {
    return value.replace(/\n/g, '<br />');
};

const applyStrong = (value: string) => {
    return value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
};

const applyTagging = (value: string) => {
    return value.replace(
        /(\@[^\s]+)/g,
        '<i class="todo-list-item__value--tag">$1</i>',
    );
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

    return applyTagging(
        applyStrong(applyStrikeThrough(applyLineBreaks(item.value))),
    );
};
