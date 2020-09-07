import { TodoListItem, todoSchema } from '../../model/TodoListItem';

const normalizeAndValidateTodo = (todo: any): TodoListItem => {
    const result = todoSchema.validate(todo);

    if (result.error) {
        throw result.error;
    }

    return result.value;
};

export const normalizeAndValidateTodos = (todos: any): TodoListItem[] => {
    if (!Array.isArray(todos)) {
        return [];
    }

    return todos.map(normalizeAndValidateTodo);
};
