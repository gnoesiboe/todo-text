import { TodoListItem } from './../../../model/TodoListItem';
import { Dispatch, SetStateAction } from 'react';
import {
    determineNextCurrentItem,
    determinePreviousCurrentItem,
} from '../utility/currentItemResolver';

export type MoveToNextHandler = () => void;

export type MoveToPreviousHandler = () => void;

export default function useNavigateThroughItems(
    currentItem: string | null,
    isEditing: boolean,
    filteredItems: TodoListItem[],
    setCurrentItem: Dispatch<SetStateAction<string | null>>,
) {
    const moveToNext: MoveToNextHandler = () => {
        if (isEditing) {
            return;
        }

        // use filteredItems to determine next, to make sure the cursor
        // does not fall on a hidden item
        setCurrentItem(determineNextCurrentItem(currentItem, filteredItems));
    };

    const moveToPrevious: MoveToPreviousHandler = () => {
        if (isEditing) {
            return;
        }

        // use filteredItems to determine previous, to make sure the cursor
        // does not fall on a hidden item
        setCurrentItem(
            determinePreviousCurrentItem(currentItem, filteredItems),
        );
    };

    return { moveToNext, moveToPrevious };
}
