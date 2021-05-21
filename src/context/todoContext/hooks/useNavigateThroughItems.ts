import { ParsedTodoValue, TodoListItemCollection } from 'model/TodoListItem';
import { Dispatch, SetStateAction } from 'react';
import {
    determineNextCurrentItem,
    determinePreviousCurrentItem,
} from '../utility/currentItemResolver';

export type MoveToNextHandler = () => void;

export type MoveToPreviousHandler = () => void;

export default function useNavigateThroughItems(
    currentItemId: string | null,
    isEditing: boolean,
    filteredItems: TodoListItemCollection<ParsedTodoValue | string>,
    setCurrentItem: Dispatch<SetStateAction<string | null>>,
) {
    const moveToNext: MoveToNextHandler = () => {
        if (isEditing) {
            return;
        }

        // use filteredItems to determine next, to make sure the cursor
        // does not fall on a hidden item
        setCurrentItem(determineNextCurrentItem(currentItemId, filteredItems));
    };

    const moveToPrevious: MoveToPreviousHandler = () => {
        if (isEditing) {
            return;
        }

        // use filteredItems to determine previous, to make sure the cursor
        // does not fall on a hidden item
        setCurrentItem(
            determinePreviousCurrentItem(currentItemId, filteredItems),
        );
    };

    return { moveToNext, moveToPrevious };
}
