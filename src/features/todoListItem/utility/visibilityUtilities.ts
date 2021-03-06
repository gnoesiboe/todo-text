import { ParsedTodoValue } from 'model/TodoListItem';
import type { TodoListItem } from 'model/TodoListItem';
import { splitAtLineBreak } from 'utility/stringUtilities';

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

const appyInlineCodeBlock: Formatter = (value) => {
    return value.replace(
        /`([^`]+)`/g,
        '<code class="todo-list-item__value__code">$1</code>',
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
            '<button class="todo-list-item__value__sub-item">$1</button>',
        )
        .replace(
            /^[*-]{1,1} \[x\] (.*)$/,
            '<button class="todo-list-item__value__sub-item todo-list-item__value__sub-item--checked">$1</button>',
        );
};

const applyFormatters = (value: string, ...formatters: Formatter[]): string => {
    let out: string = value;

    formatters.forEach((applyTo) => (out = applyTo(out)));

    return out;
};

export const prepareForVisibility = (
    item: TodoListItem<ParsedTodoValue>,
): string => {
    if (item.value.isHeading) {
        return formatAsHeading(item.value.raw);
    }

    return splitAtLineBreak(item.value.raw).reduce<string>(
        (accumulator, currentLine, currentIndex) => {
            const formatters = [
                applyTagging,
                applyDeadline,
                applyLinks,
                applyProjects,
                applyStrong,
                applyStrikeThrough,
                appyInlineCodeBlock,
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
        },
        '',
    );
};
