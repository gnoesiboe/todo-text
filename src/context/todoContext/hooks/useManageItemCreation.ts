import { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';
import { generateId } from 'utility/idGenerator';
import { persist } from '../../../repository/todoListItemRepository';
import { createEmpty } from '../../../model/factory/todoListItemFactory';
import { useLoggedInUser } from '../../authenticationContext/AuthenticationContext';
import { notifyError } from '../../../utility/notifier';
import { User } from '../../../model/User';
import { handleRankingUpdatesForNextItemsToNew } from '../../../handler/updateTodoListItemRankingPersistanceHandlers';
import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyCreateNewItemAndStartSaving,
    applyStopSaving,
} from '../utility/todoContextStateMutators';

export type CreateNewItemAfterCurrentHandler = () => void;

export type CreateNewItemBeforeCurrentHandler = () => void;

export type CreateNewItemAtTheStartHandler = () => void;

export default function useManageItemCreation(
    setTodoContextState: TodoContextStateSetter,
    currentItem: TodoListItem<string | ParsedTodoValue> | null,
) {
    const user = useLoggedInUser();

    const createNewItem = async (user: User, rank: number) => {
        const newItem = createEmpty(generateId(), user.id, rank);

        // update in memory changes, for quick interface update
        setTodoContextState((currentState) =>
            applyCreateNewItemAndStartSaving(currentState, newItem),
        );

        // updates server rows
        const success = await persist(newItem);

        if (success) {
            await handleRankingUpdatesForNextItemsToNew(user.id, newItem);
        } else {
            notifyError(
                'Something went wrong when persisting the new todo. Refresh the page and try again',
            );
        }

        setTodoContextState((currentState) => applyStopSaving(currentState));
    };

    const createNewItemAtTheStart: CreateNewItemAtTheStartHandler = () => {
        if (!user) {
            throw new Error(
                'Expecting current user to be available at this point',
            );
        }

        // noinspection JSIgnoredPromiseFromCall
        createNewItem(user, 0);
    };

    const createNewItemAfterCurrent: CreateNewItemAfterCurrentHandler = () => {
        if (!user) {
            throw new Error(
                'Expecting current user to be available at this point',
            );
        }

        if (!currentItem) {
            throw new Error(
                'Expecting there to be a current value at this point',
            );
        }

        // noinspection JSIgnoredPromiseFromCall
        createNewItem(user, currentItem.rank + 1);
    };

    const createNewItemBeforeCurrent: CreateNewItemBeforeCurrentHandler =
        () => {
            if (!user) {
                throw new Error(
                    'Expecting current user to be available at this point',
                );
            }

            if (!currentItem) {
                throw new Error(
                    'Expecting there to be a current value at this point',
                );
            }

            // noinspection JSIgnoredPromiseFromCall
            createNewItem(user, currentItem.rank);
        };

    return {
        createNewItemAtTheStart,
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
    };
}
