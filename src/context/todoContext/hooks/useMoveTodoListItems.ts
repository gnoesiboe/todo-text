import { TodoListItemCollection } from 'model/TodoListItem';
import { notifyInfo } from 'utility/notifier';
import { useLoggedInUser } from '../../authenticationContext/AuthenticationContext';
import { resolveRanksThatNeedToBeUpdated } from '../../../handler/rankingUpdatesResolver';
import useThrottleItemRankingUpdates from './useThrottleItemRankingUpdates';
import { Statuses, TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyItemUpdateCollection,
    applyStartSorting,
    applyStopSorting,
} from '../utility/todoContextStateMutators';

export type MoveCurrentItemUpHandler = () => Promise<boolean>;

export type MoveCurrentItemDownHandler = () => Promise<boolean>;

export type MoveToIndexHandler = (
    previousIndex: number,
    nextIndex: number,
) => Promise<boolean>;

export default function useMoveTodoListItems(
    items: TodoListItemCollection,
    currentItemId: string | null,
    statuses: Statuses,
    setTodoContextState: TodoContextStateSetter,
) {
    const user = useLoggedInUser();

    const queueUpdatesToPersist =
        useThrottleItemRankingUpdates(setTodoContextState);

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

        if (statuses.isEditing) {
            return false;
        }

        if (!statuses.isSorting) {
            notifyInfo('Moving up is only available in sort modus');

            return false;
        }

        if (!currentItemId) {
            return false;
        }

        const currentIndex = items.findIndex(
            (cursorItem) => cursorItem.id === currentItemId,
        );

        if (currentIndex === 0) {
            // is first element in items array. Not possible to move up

            return false;
        }

        const nextIndex = currentIndex - 1;

        const updates = resolveRanksThatNeedToBeUpdated(
            items,
            currentIndex,
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

    const moveCurrentItemDown: MoveCurrentItemDownHandler = async () => {
        if (!user) {
            throw new Error('Expecting user to be available at this point');
        }

        if (statuses.isEditing) {
            return false;
        }

        if (!statuses.isSorting) {
            notifyInfo('Moving down is only available in sort modus');

            return false;
        }

        if (!currentItemId) {
            return false;
        }

        const currentIndex = items.findIndex(
            (cursorItem) => cursorItem.id === currentItemId,
        );

        const nextIndex = currentIndex + 1;

        if (nextIndex >= items.length) {
            // is last element in items array. not possible to move down

            return false;
        }

        const updates = resolveRanksThatNeedToBeUpdated(
            items,
            currentIndex,
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

    const moveToIndex: MoveToIndexHandler = async (
        previousIndex,
        nextIndex,
    ) => {
        if (statuses.isEditing) {
            return false;
        }

        if (!statuses.isSorting) {
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
