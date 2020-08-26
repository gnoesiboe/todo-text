import { TodoListItem, isBeingEdited } from './../TodoListItem';

export const applyIsEditingAnItemSelector = (items: TodoListItem[]): boolean =>
    items.some((item) => isBeingEdited(item));
