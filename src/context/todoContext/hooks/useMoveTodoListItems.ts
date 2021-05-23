import { TodoListItem, TodoListItemCollection } from 'model/TodoListItem';
import { notifyError, notifyInfo } from 'utility/notifier';
import { batchUpdateItems } from '../../../repository/todoListItemRepository';
import { useLoggedInUser } from '../../authenticationContext/AuthenticationContext';
import { resolveRanksThatNeedToBeUpdated } from '../../../handler/rankingUpdatesResolver';
import useThrottleItemRankingUpdates from './useThrottleItemRankingUpdates';
import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyItemUpdateCollection,
    applyStartSorting,
    applyStopSaving,
    applyStopSorting,
    applySwitchCurrentItemPositionsAndStartSaving,
} from '../utility/todoContextStateMutators';

export type MoveCurrentItemUpHandler = () => Promise<boolean>;

export type MoveCurrentItemDownHandler = () => Promise<boolean>;

export type MoveToIndexHandler = (
    previousIndex: number,
    nextIndex: number,
) => Promise<boolean>;

const applySwitchOptimisticUpdating = (
    setTodoContextState: TodoContextStateSetter,
    itemToSwitchWith: TodoListItem | null,
    oldRank: number,
    newRank: number,
) => {
    setTodoContextState((currentState) =>
        applySwitchCurrentItemPositionsAndStartSaving(
            currentState,
            itemToSwitchWith?.id || null,
            oldRank,
            newRank,
        ),
    );
};

const applySwitchUpdatePersisting = async (
    currentItemId: string,
    itemToSwitchWith: TodoListItem | null,
    newRank: number,
    oldRank: number,
): Promise<boolean> => {
    const batchedUpdates: Record<string, Partial<Omit<TodoListItem, 'id'>>> = {
        [currentItemId]: { rank: newRank },
    };

    if (itemToSwitchWith) {
        batchedUpdates[itemToSwitchWith.id] = {
            rank: oldRank,
        };
    }

    const batchedUpdateSuccess = batchUpdateItems(batchedUpdates);

    if (!batchedUpdateSuccess) {
        notifyError(
            'Something went wrong when persisting updates to the server. Please refresh the page.',
        );
    }

    return batchedUpdateSuccess;
};

export default function useMoveTodoListItems(
    items: TodoListItemCollection,
    currentItemId: string | null,
    isEditing: boolean,
    isSorting: boolean,
    setTodoContextState: TodoContextStateSetter,
) {
    const user = useLoggedInUser();

    const startSorting = () => {
        setTodoContextState((currentState) => applyStartSorting(currentState));
    };

    const stopSorting = () => {
        setTodoContextState((currentState) => applyStopSorting(currentState));
    };

    const moveCurrentItemUp: MoveCurrentItemUpHandler = async () => {
        if (!user) {
            throw new Error('Expecting user to be available at this point');
        }

        if (isEditing) {
            return false;
        }

        if (!isSorting) {
            notifyInfo('Moving up is only available in sort modus');

            return false;
        }

        if (!currentItemId) {
            return false;
        }

        const itemIndex = items.findIndex(
            (cursorItem) => cursorItem.id === currentItemId,
        );

        if (itemIndex === 0) {
            // is first element in items array. Not possible to move up

            return false;
        }

        const oldRank = items[itemIndex].rank;
        const newRank = oldRank - 1;

        const itemToSwitchWith =
            items.find((cursorItem) => cursorItem.rank === newRank) || null;

        if (!itemToSwitchWith) {
            console.warn(
                'There is an error in the current ranking somewhere. The item to switch with cannot be resolved.',
            );
        }

        // optimistic updating
        applySwitchOptimisticUpdating(
            setTodoContextState,
            itemToSwitchWith,
            oldRank,
            newRank,
        );

        // persist rank updates to server
        const success = await applySwitchUpdatePersisting(
            currentItemId,
            itemToSwitchWith,
            newRank,
            oldRank,
        );

        setTodoContextState((currentState) => applyStopSaving(currentState));

        return success;
    };

    const moveCurrentItemDown: MoveCurrentItemDownHandler = async () => {
        if (!user) {
            throw new Error('Expecting user to be available at this point');
        }

        if (isEditing) {
            return false;
        }

        if (!isSorting) {
            notifyInfo('Moving down is only available in sort modus');

            return false;
        }

        if (!currentItemId) {
            return false;
        }

        const itemIndex = items.findIndex(
            (cursorItem) => cursorItem.id === currentItemId,
        );

        if (itemIndex === items.length - 1) {
            // is last element in items array. not possible to move down

            return false;
        }

        const oldRank = items[itemIndex].rank;
        const newRank = oldRank + 1;

        const itemToSwitchWith =
            items.find((cursorItem) => cursorItem.rank === newRank) || null;

        if (!itemToSwitchWith) {
            console.warn(
                'There is an error in the current ranking somewhere. The item to switch with cannot be resolved.',
            );
        }

        // optimistic updating
        applySwitchOptimisticUpdating(
            setTodoContextState,
            itemToSwitchWith,
            oldRank,
            newRank,
        );

        // persist rank updates to server
        const success = await applySwitchUpdatePersisting(
            currentItemId,
            itemToSwitchWith,
            newRank,
            oldRank,
        );

        setTodoContextState((currentState) => applyStopSaving(currentState));

        return success;
    };

    const { queueUpdatesToPersist } =
        useThrottleItemRankingUpdates(setTodoContextState);

    const moveToIndex: MoveToIndexHandler = async (
        previousIndex,
        nextIndex,
    ) => {
        if (isEditing) {
            return false;
        }

        if (!isSorting) {
            notifyInfo('Moving is only available in sort modus');

            return false;
        }

        const updates = resolveRanksThatNeedToBeUpdated(
            items,
            previousIndex,
            nextIndex,
        );

        // optimistic updating
        setTodoContextState((currentState) =>
            applyItemUpdateCollection(currentState, updates),
        );

        // persist to server
        queueUpdatesToPersist(updates);

        return true;
    };

    return {
        moveCurrentItemUp,
        moveCurrentItemDown,
        moveToIndex,
        startSorting,
        stopSorting,
    };
}
