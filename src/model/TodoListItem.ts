import { generateId } from './../utility/idGenerator';
import Joi from 'joi';

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
