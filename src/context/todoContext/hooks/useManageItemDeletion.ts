import { applyDelete } from '../utility/todosMutators';
import {
    fetchOneWithId,
    remove,
} from '../../../repository/todoListItemRepository';
import { notifyError } from '../../../utility/notifier';
import { handleRankingPersistenceForItemRemoval } from '../../../handler/updateTodoListItemRankingPersistanceHandlers';
import { determineNextCurrentItem } from '../utility/currentItemResolver';
import { Dispatch, SetStateAction } from 'react';
import { TodoListItemCollection } from '../../../model/TodoListItem';
import { useLoggedInUser } from '../../authenticationContext/AuthenticationContext';

export type DeleteItemHandler = (id: string) => Promise<boolean>;

export default function useManageItemDeletion(
    items: TodoListItemCollection,
    setItems: Dispatch<SetStateAction<TodoListItemCollection>>,
    currentItemId: string | null,
    setCurrentItemId: Dispatch<SetStateAction<string | null>>,
) {
    const user = useLoggedInUser();

    const deleteItem: DeleteItemHandler = async (id) => {
        if (!user) {
            throw new Error('Expecting user to be available at this point');
        }

        // update in-memory storage
        setItems(applyDelete(items, id));

        const itemToDelete = await fetchOneWithId(id);

        if (!itemToDelete) {
            return false;
        }

        const deletingSuccessful = await remove(itemToDelete.id);

        if (!deletingSuccessful) {
            notifyError(
                'Something went wrong when removing an item. Please refresh the page and try again.',
            );

            return false;
        }

        const reSortingSuccessful = await handleRankingPersistenceForItemRemoval(
            user.id,
            itemToDelete,
        );

        if (!reSortingSuccessful) {
            notifyError(
                'Something went wrong when re-sorting the items. Please refresh to continue.',
            );
        }

        const nextCurrentItem = determineNextCurrentItem(currentItemId, items);

        setCurrentItemId(nextCurrentItem);

        return reSortingSuccessful;
    };

    return { deleteItem };
}
