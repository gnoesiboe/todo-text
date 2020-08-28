import { isHeading } from './../../../model/TodoListItem';
import type { TodoListItem } from '../../../model/TodoListItem';

type Formatter = (value: string) => string;

const applyStrikeThrough: Formatter = (value) => {
    return value.replace(
        /~~([^~]+)~~/,
        '<span class="todo-list-item__value--removed">$1</span>',
    );
};

const applyLineBreaks: Formatter = (value) => {
    return value.replace(/\n/g, '<br />');
};

const applyStrong: Formatter = (value) => {
    return value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
};

const applyTagging: Formatter = (value) => {
    return value.replace(
        /(\@[^\s]+)/g,
        '<i class="todo-list-item__value__tag">$1</i>',
    );
};

const applyLinks: Formatter = (value) => {
    return value.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="todo-list-item__value__link" target="_blank" rel="noreferrer">$1</a>',
    );
};

const applyProjects: Formatter = (value) => {
    return value.replace(
        /^(\[[^\]]+\])/g,
        '<span class="todo-list-item__value__project">$1</span>',
    );
};

const formatAsHeading: Formatter = (value) => {
    return value.replace(
        /^# (.+)$/g,
        '<span class="todo-list-item__value__heading">$1</span>',
    );
};

const applyFormatters = (value: string, ...formatters: Formatter[]): string => {
    let out: string = value;

    formatters.forEach((applyTo) => (out = applyTo(out)));

    return out;
};

export const prepareForVisibility = (item: TodoListItem): string => {
    if (isHeading(item)) {
        return formatAsHeading(item.value);
    }

    return applyFormatters(
        item.value,
        applyTagging,
        applyLinks,
        applyProjects,
        applyStrong,
        applyStrikeThrough,
        applyLineBreaks,
    );
};
