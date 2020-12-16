import { TodoListItem } from 'model/TodoListItem';
import { Dispatch, SetStateAction, useState } from 'react';
import {
    applyMoveCurrentItemDown,
    applyMoveCurrentItemUp,
    applyMoveToIndex,
} from '../utility/todosMutators';
import { notifyInfo } from 'utility/notifier';

export type MoveCurrentItemUpHandler = () => void;

export type MoveCurrentItemDownHandler = () => void;

export type MoveToIndexHandler = (
    previousIndex: number,
    nextIndex: number,
) => void;

export default function useMoveTodoListItems(
    currentItem: string | null,
    isEditing: boolean,
    setItems: Dispatch<SetStateAction<TodoListItem[]>>,
) {
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const startSorting = () => setIsSorting(true);

    const stopSorting = () => setIsSorting(false);

    const moveCurrentItemUp: MoveCurrentItemUpHandler = () => {
        if (isEditing) {
            return;
        }

        if (!isSorting) {
            notifyInfo('Moving is only available in sort modus');

            return;
        }

        setItems((items) => applyMoveCurrentItemUp(items, currentItem));
    };

    const moveCurrentItemDown: MoveCurrentItemDownHandler = () => {
        if (isEditing) {
            return;
        }

        if (!isSorting) {
            notifyInfo('Moving is only available in sort modus');

            return;
        }

        setItems((items) => applyMoveCurrentItemDown(items, currentItem));
    };

    const moveToIndex: MoveToIndexHandler = (previousIndex, nextIndex) => {
        if (isEditing) {
            return;
        }

        if (!isSorting) {
            notifyInfo('Moving is only available in sort modus');

            return;
        }

        setItems((items) => applyMoveToIndex(items, previousIndex, nextIndex));
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
