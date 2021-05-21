import {
    TodoListItemCollection,
    TodoListItemCollectionUpdates,
} from '../model/TodoListItem';
import produce from 'immer';

export const resolveRanksThatNeedToBeUpdated = (
    items: TodoListItemCollection,
    previousIndex: number,
    nextIndex: number,
) => {
    const updates: TodoListItemCollectionUpdates = {};

    const movedItems = produce<TodoListItemCollection>(items, (nextItems) => {
        if (!items[previousIndex]) {
            throw new Error('Expecting item at previous index to be available');
        }

        const itemToMove = nextItems.splice(previousIndex, 1)[0];

        nextItems.splice(nextIndex, 0, itemToMove);
    });

    movedItems.forEach((cursorItem, index) => {
        const requiredRank = index + 1;
        const actualRank = cursorItem.rank;

        if (requiredRank !== actualRank) {
            updates[cursorItem.id] = { rank: requiredRank };
        }
    });

    return updates;
};
