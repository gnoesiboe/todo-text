import { TodoListItem, Mode } from './../TodoListItem';

export const applyIsEditingAnItemSelector = (
    items: TodoListItem[],
): boolean => {
    return items.some((item) => item.mode === Mode.Edit);
};
