import { generateId } from 'utility/idGenerator';
import Joi from 'joi';

export interface TodoListItem<ValueType = string> {
    id: string;
    value: ValueType;
    done: boolean;
}

export type TodoListItemCollection<ValueType = string> = Array<
    TodoListItem<ValueType>
>;

export type ParsedTodoNote = {
    note: string;
    isTodo: boolean;
    done: boolean | null;
};

export type ParsedTodoProgress = {
    done: number;
    todo: number;
    total: number;
};

export type ParsedTodoValue = {
    raw: string;
    summary: string;
    notes: Array<ParsedTodoNote>;
    progress: ParsedTodoProgress;
    isCancelled: boolean;
    isHeading: boolean;
    isMust: boolean;
    isWaiting: boolean;
    isQuickfix: boolean;
    snoozedUntil: Date | null;
    isSnoozed: boolean;
    isEvening: boolean;
    isActionable: boolean;
};

export const todoSchema = Joi.object({
    id: Joi.string()
        .uuid()
        .min(0)
        .required()
        .default(() => generateId()),
    value: Joi.string().default(''),
    done: Joi.boolean().required().default(false),
});
