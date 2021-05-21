import { TodoListItemCollection } from '../../../model/TodoListItem';

export const sortItemsByRank = (
    items: TodoListItemCollection,
    direction: 'ascending' | 'descending' = 'ascending',
): TodoListItemCollection => {
    return items.sort((first, second) => {
        if (first.rank > second.rank) {
            return direction === 'ascending' ? 1 : -1;
        }

        if (first.rank < second.rank) {
            return direction === 'ascending' ? -1 : 1;
        }

        return 0;
    });
};
