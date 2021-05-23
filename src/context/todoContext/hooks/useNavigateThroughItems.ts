import { ParsedTodoValue, TodoListItemCollection } from 'model/TodoListItem';
import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applySetNextCurrentItem,
    applySetPreviousCurrentItem,
} from '../utility/todoContextStateMutators';

export type MoveToNextHandler = () => void;

export type MoveToPreviousHandler = () => void;

export default function useNavigateThroughItems(
    filteredItems: TodoListItemCollection<ParsedTodoValue | string>,
    setTodoContextState: TodoContextStateSetter,
) {
    const moveToNext: MoveToNextHandler = () => {
        setTodoContextState((currentState) => {
            if (currentState.statuses.isEditing) {
                return currentState;
            }

            // use filteredItems to determine next, to make sure the cursor
            // does not fall on a hidden item
            return applySetNextCurrentItem(
                currentState,
                currentState.statuses.isSorting
                    ? currentState.items
                    : filteredItems,
            );
        });
    };

    const moveToPrevious: MoveToPreviousHandler = () => {
        setTodoContextState((currentState) => {
            if (currentState.statuses.isEditing) {
                return currentState;
            }

            // use filteredItems to determine previous, to make sure the cursor
            // does not fall on a hidden item
            return applySetPreviousCurrentItem(
                currentState,
                currentState.statuses.isSorting
                    ? currentState.items
                    : filteredItems,
            );
        });
    };

    return { moveToNext, moveToPrevious };
}
