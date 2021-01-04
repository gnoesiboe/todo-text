import {
    TodoListItem,
    todoSchema,
    TodoListItemCollection,
} from 'model/TodoListItem';
import { notifyError } from 'utility/notifier';

const normalizeAndValidateTodo = (todo: any): TodoListItem => {
    const result = todoSchema.validate(todo);

    if (result.error) {
        notifyError(
            'An error occurred while validating the input from Dropbox. See console for details',
        );

        console.error(result.error);
    }

    return result.value;
};

export const normalizeAndValidateTodos = (
    todos: any,
): TodoListItemCollection => {
    if (!Array.isArray(todos)) {
        return [];
    }

    return todos.map(normalizeAndValidateTodo);
};
