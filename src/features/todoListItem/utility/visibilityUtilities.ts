import { isHeading } from './../../../model/TodoListItem';
import type { TodoListItem } from '../../../model/TodoListItem';

type Formatter = (value: string) => string;

const applyStrikeThrough: Formatter = (value) => {
    return value.replace(
        /~~([^~]+)~~/,
        '<span class="todo-list-item__value__removed">$1</span>',
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
        /(@[^\s]+)/g,
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

const applyDeadline: Formatter = (value) => {
    return value.replace(
        /(\(DL: [^)]+\))/g,
        '<span class="todo-list-item__value__deadline">$1</span>',
    );
};

const applySummaryWrapper: Formatter = (value) => {
    return `<div class="todo-list-item__value__summary">${value}</div>`;
};

const applyNoteWrapper: Formatter = (value) => {
    return `<div class="todo-list-item__value__note">${value}</div>`;
};

const applySubItem: Formatter = (value) => {
    return value
        .replace(
            /^[*-]{1,1} \[ \] (.*)$/,
            '<div class="todo-list-item__value__sub-item">$1</div>',
        )
        .replace(
            /^[*-]{1,1} \[x\] (.*)$/,
            '<div class="todo-list-item__value__sub-item todo-list-item__value__sub-item--checked">$1</div>',
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

    const lines = item.value.split(/\r?\n/g);

    return lines
        .filter((value) => value.length > 0)
        .reduce<string>((accumulator, currentLine, currentIndex) => {
            const formatters = [
                applyTagging,
                applyDeadline,
                applyLinks,
                applyProjects,
                applyStrong,
                applyStrikeThrough,
                applyLineBreaks,
            ];

            if (currentIndex === 0) {
                formatters.push(applySummaryWrapper);
            } else {
                formatters.push(applySubItem, applyNoteWrapper);
            }

            const withFormattersApplied = applyFormatters(
                currentLine,
                ...formatters,
            );

            return accumulator + withFormattersApplied;
        }, '');
};
