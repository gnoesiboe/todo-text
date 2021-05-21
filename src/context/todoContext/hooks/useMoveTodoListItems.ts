import { TodoListItem, TodoListItemCollection } from 'model/TodoListItem';
import { Dispatch, SetStateAction, useState } from 'react';
import { applyUpdate } from '../utility/todosMutators';
import { notifyError, notifyInfo } from 'utility/notifier';
import { batchUpdateItems } from '../../../repository/todoListItemRepository';
import { useLoggedInUser } from '../../authenticationContext/AuthenticationContext';
import { resolveRanksThatNeedToBeUpdated } from '../../../handler/rankingUpdatesResolver';
import useThrottleItemRankingUpdates from './useThrottleItemRankingUpdates';

export type MoveCurrentItemUpHandler = () => Promise<boolean>;

export type MoveCurrentItemDownHandler = () => Promise<boolean>;

export type MoveToIndexHandler = (
    previousIndex: number,
    nextIndex: number,
) => Promise<boolean>;

const applySwitchOptimisticUpdating = (
    setItems: Dispatch<SetStateAction<TodoListItemCollection>>,
    currentItemId: string,
    itemToSwitchWith: TodoListItem | null,
    oldRank: number,
    newRank: number,
) => {
    setItems((currentItems) => {
        const updatedItems = applyUpdate(currentItems, currentItemId, {
            rank: newRank,
        });

        if (!itemToSwitchWith) {
            return updatedItems;
        }

        return applyUpdate(updatedItems, itemToSwitchWith.id, {
            rank: oldRank,
        });
    });
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
    setItems: Dispatch<SetStateAction<TodoListItemCollection>>,
) {
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const user = useLoggedInUser();

    const startSorting = () => setIsSorting(true);

    const stopSorting = () => setIsSorting(false);

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
            setItems,
            currentItemId,
            itemToSwitchWith,
            oldRank,
            newRank,
        );

        // persist rank updates to server
        return await applySwitchUpdatePersisting(
            currentItemId,
            itemToSwitchWith,
            newRank,
            oldRank,
        );
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
            setItems,
            currentItemId,
            itemToSwitchWith,
            oldRank,
            newRank,
        );

        // persist rank updates to server
        return await applySwitchUpdatePersisting(
            currentItemId,
            itemToSwitchWith,
            newRank,
            oldRank,
        );
    };

    const { queueUpdatesToPersist } = useThrottleItemRankingUpdates();

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
        setItems((currentItems) => {
            let nextItems = currentItems;

            Object.keys(updates).forEach((id) => {
                const itemUpdates = updates[id];

                nextItems = applyUpdate(nextItems, id, itemUpdates);
            });

            return nextItems;
        });

        // persist to server
        queueUpdatesToPersist(updates);

        return true;
    };

    return {
        moveCurrentItemUp,
        moveCurrentItemDown,
        moveToIndex,
        isSorting,
        startSorting,
        stopSorting,
    };
}
