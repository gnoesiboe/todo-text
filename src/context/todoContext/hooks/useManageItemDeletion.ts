import {
    fetchOneWithId,
    remove,
} from '../../../repository/todoListItemRepository';
import { notifyError } from '../../../utility/notifier';
import { handleRankingPersistenceForItemRemoval } from '../../../handler/updateTodoListItemRankingPersistanceHandlers';
import { useLoggedInUser } from '../../authenticationContext/AuthenticationContext';
import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyDeleteItemAndStartPersisting,
    applySetNextCurrentItem,
    applyStopSaving,
} from '../utility/todoContextStateMutators';
import {
    ParsedTodoValue,
    TodoListItemCollection,
} from '../../../model/TodoListItem';

export type DeleteItemHandler = (id: string) => Promise<boolean>;

export default function useManageItemDeletion(
    setTodoContextState: TodoContextStateSetter,
    filteredItems: TodoListItemCollection<ParsedTodoValue | string>,
) {
    const user = useLoggedInUser();

    const deleteItem: DeleteItemHandler = async (id) => {
        if (!user) {
            throw new Error('Expecting user to be available at this point');
        }

        // update in-memory storage
        setTodoContextState((currentState) =>
            applyDeleteItemAndStartPersisting(currentState, id),
        );

        const itemToDelete = await fetchOneWithId(id);

        if (!itemToDelete) {
            setTodoContextState((currentState) =>
                applyStopSaving(currentState),
            );

            return false;
        }

        // update server state
        const deletingSuccessful = await remove(itemToDelete.id);

        if (!deletingSuccessful) {
            setTodoContextState((currentState) =>
                applyStopSaving(currentState),
            );

            notifyError(
                'Something went wrong when removing an item. Please refresh the page and try again.',
            );

            return false;
        }

        const reSortingSuccessful =
            await handleRankingPersistenceForItemRemoval(user.id, itemToDelete);

        setTodoContextState((currentState) => applyStopSaving(currentState));

        if (!reSortingSuccessful) {
            notifyError(
                'Something went wrong when re-sorting the items. Please refresh to continue.',
            );
        }

        setTodoContextState((currentState) =>
            applySetNextCurrentItem(currentState, filteredItems),
        );

        return reSortingSuccessful;
    };

    return { deleteItem };
}
