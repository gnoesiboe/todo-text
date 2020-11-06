import { generateId } from './../utility/idGenerator';
import Joi from 'joi';
import { splitAtLineBreak } from '../utility/stringUtilities';

export interface TodoListItem {
    id: string;
    value: string;
    done: boolean;
}

export const todoSchema = Joi.object({
    id: Joi.string()
        .uuid()
        .min(0)
        .required()
        .default(() => generateId()),
    value: Joi.string().default(''),
    done: Joi.boolean().required().default(false),
});

export const isCancelled = (item: TodoListItem) =>
    !!item.value.match(/^~~[^~]+~~$/);

export const isHeading = (item: TodoListItem) => !!item.value.match(/^# .*$/);

export const isMust = (item: TodoListItem) => !!item.value.match(/@must/);

export const isWaiting = (item: TodoListItem) =>
    !!item.value.match(/^.*@waiting/);

export const isQuickfix = (item: TodoListItem) =>
    !!item.value.match(/^.*@quickfix/);

export const isActionable = (item: TodoListItem) =>
    !isWaiting(item) && !isCancelled(item) && !isHeading(item);

export const hasNotes = (item: TodoListItem) =>
    splitAtLineBreak(item.value).length > 1;

export const isEvening = (item: TodoListItem) =>
    !!item.value.match(/^.*@evening/);
