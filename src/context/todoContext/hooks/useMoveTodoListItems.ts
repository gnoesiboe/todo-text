import { TodoListItem } from './../../../model/TodoListItem';
import { Dispatch, SetStateAction } from 'react';
import {
    applyMoveCurrentItemDown,
    applyMoveCurrentItemUp,
    applyMoveToIndex,
} from '../utility/todosMutators';

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
    const moveCurrentItemUp: MoveCurrentItemUpHandler = () => {
        if (isEditing) {
            return;
        }

        setItems((items) => applyMoveCurrentItemUp(items, currentItem));
    };

    const moveCurrentItemDown: MoveCurrentItemDownHandler = () => {
        if (isEditing) {
            return;
        }

        setItems((items) => applyMoveCurrentItemDown(items, currentItem));
    };

    const moveToIndex: MoveToIndexHandler = (previousIndex, nextIndex) =>
        setItems((items) => applyMoveToIndex(items, previousIndex, nextIndex));

    return { moveCurrentItemUp, moveCurrentItemDown, moveToIndex };
}
