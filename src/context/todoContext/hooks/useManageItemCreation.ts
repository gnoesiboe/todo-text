import { MarkCurrentItemHandler } from './useManageCurrentItem';
import { StartEditHandler } from './useManageIsEditingState';
import { TodoListItem } from './../../../model/TodoListItem';
import {
    applyCreateNewItemAfter,
    applyCreateNewItemAtTheStart,
    applyCreateNewItemBefore,
} from '../utility/todosMutators';
import { generateId } from '../../../utility/idGenerator';
import { Dispatch, SetStateAction } from 'react';

export type CreateNewItemAfterCurrentHandler = () => void;

export type CreateNewItemBeforeCurrentHandler = () => void;

export type CreateNewItemAtTheStartHandler = () => void;

export default function useManageItemCreation(
    setItems: Dispatch<SetStateAction<TodoListItem[]>>,
    markCurrentItem: MarkCurrentItemHandler,
    startEdit: StartEditHandler,
    currentItem: string | null,
) {
    const createNewItemAtTheStart: CreateNewItemAtTheStartHandler = () => {
        const id = generateId();

        setItems((currentItems) =>
            applyCreateNewItemAtTheStart(currentItems, id),
        );

        markCurrentItem(id);

        // as state changes are asynchronous we cannot be sure that the current item has already
        // been updated. As this is required for start edit, we ignore it by passing in `true`
        startEdit(true);
    };

    const createNewItemAfterCurrent: CreateNewItemAfterCurrentHandler = () => {
        if (!currentItem) {
            throw new Error(
                'Expecting there to be a current value at this point',
            );
        }

        const id = generateId();

        setItems((currentItems) =>
            applyCreateNewItemAfter(currentItems, currentItem, id),
        );

        markCurrentItem(id);
    };

    const createNewItemBeforeCurrent: CreateNewItemBeforeCurrentHandler = () => {
        if (!currentItem) {
            throw new Error(
                'Expecting there to be a current value at this point',
            );
        }

        const id = generateId();

        setItems((currentItems) =>
            applyCreateNewItemBefore(currentItems, currentItem, id),
        );

        markCurrentItem(id);
    };

    return {
        createNewItemAtTheStart,
        createNewItemAfterCurrent,
        createNewItemBeforeCurrent,
    };
}
