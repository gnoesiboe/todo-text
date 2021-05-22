import {
    ParsedTodoValue,
    TodoListItem,
    TodoListItemCollection,
} from 'model/TodoListItem';
import { MarkCurrentItemHandler } from './useManageCurrentItem';
import { StartEditHandler } from './useManageIsEditingState';
import { applyCreateNewItem } from '../utility/todosMutators';
import { generateId } from 'utility/idGenerator';
import { Dispatch, SetStateAction } from 'react';
import { persist } from '../../../repository/todoListItemRepository';
import { createEmpty } from '../../../model/factory/todoListItemFactory';
import { useLoggedInUser } from '../../authenticationContext/AuthenticationContext';
import { notifyError } from '../../../utility/notifier';
import { User } from '../../../model/User';
import { handleRankingUpdatesForNextItemsToNew } from '../../../handler/updateTodoListItemRankingPersistanceHandlers';

export type CreateNewItemAfterCurrentHandler = () => void;

export type CreateNewItemBeforeCurrentHandler = () => void;

export type CreateNewItemAtTheStartHandler = () => void;

export default function useManageItemCreation(
    setItems: Dispatch<SetStateAction<TodoListItemCollection>>,
    markCurrentItem: MarkCurrentItemHandler,
    startEdit: StartEditHandler,
    currentItem: TodoListItem<string | ParsedTodoValue> | null,
    setIsSaving: Dispatch<SetStateAction<boolean>>,
) {
    const user = useLoggedInUser();

    const createNewItem = async (user: User, rank: number) => {
        const newItem = createEmpty(generateId(), user.id, rank);

        // update in memory changes, for quick interface update
        setItems((currentItems) => applyCreateNewItem(currentItems, newItem));

        // updates server rows
        setIsSaving(true);

        // @todo move to async function?
        const success = await persist(newItem);

        setIsSaving(false);

        if (success) {
            // noinspection ES6MissingAwait
            handleRankingUpdatesForNextItemsToNew(user.id, newItem);
        } else {
            notifyError(
                'Something went wrong when persisting the new todo. Refresh the page and try again',
            );
        }

        markCurrentItem(newItem.id);

        startEdit(true);
    };

    const createNewItemAtTheStart: CreateNewItemAtTheStartHandler = () => {
        if (!user) {
            throw new Error(
                'Expecting current user to be available at this point',
            );
        }

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

            createNewItem(user, currentItem.rank);
        };

    return {
        createNewItemAtTheStart,
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
    };
}
