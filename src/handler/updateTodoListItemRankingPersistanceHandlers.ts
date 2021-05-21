import { TodoListItem, TodoListItemCollection } from '../model/TodoListItem';
import {
    batchUpdateItems,
    fetchAllForUser,
} from '../repository/todoListItemRepository';
import { sortItemsByRank } from '../context/todoContext/utility/sortingUtilities';

const resolveAllItems = async (
    userId: string,
): Promise<TodoListItemCollection> => {
    const allItems = await fetchAllForUser(userId);

    return sortItemsByRank(allItems, 'ascending');
};

export const handleRankingUpdatesForNextItemsToNew = async (
    userId: string,
    newItem: TodoListItem,
): Promise<boolean> => {
    try {
        const allItems = await resolveAllItems(userId);

        const combinedUpdates: Record<
            string,
            Partial<Omit<TodoListItem, 'id'>>
        > = {};

        allItems.forEach((item) => {
            if (item.id === newItem.id) {
                return;
            }

            if (item.rank < newItem.rank) {
                return;
            }

            combinedUpdates[item.id] = {
                rank: item.rank + 1,
            };
        });

        return await batchUpdateItems(combinedUpdates);
    } catch (error) {
        console.error('Something went wrong whens re-sorting items', error);

        return false;
    }
};

export const handleRankingPersistenceForItemRemoval = async (
    userId: string,
    removedItem: TodoListItem,
): Promise<boolean> => {
    try {
        const allItems = await resolveAllItems(userId);

        const combinedUpdates: Record<
            string,
            Partial<Omit<TodoListItem, 'id'>>
        > = {};

        allItems.forEach((item) => {
            if (item.rank <= removedItem.rank) {
                return;
            }

            combinedUpdates[item.id] = {
                rank: item.rank - 1,
            };
        });

        return await batchUpdateItems(combinedUpdates);
    } catch (error) {
        console.error('Something went wrong when re-ordering items', error);

        return false;
    }
};

export const handleRankingPersistenceForItemMovingUp = async (
    userId: string,
    itemId: string,
    newRank: number,
): Promise<boolean> => {
    try {
        const allItems = await resolveAllItems(userId);

        const combinedUpdates: Record<
            string,
            Partial<Omit<TodoListItem, 'id'>>
        > = {};

        allItems.forEach((item) => {
            if (item.id === itemId) {
                return;
            }

            if (item.rank >= newRank) {
                return;
            }

            combinedUpdates[item.id] = {
                rank: item.rank + 1,
            };
        });

        return await batchUpdateItems(combinedUpdates);
    } catch (error) {
        console.error('Something went wrong when moving item up', error);

        return false;
    }
};
