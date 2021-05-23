import { ParsedTodoValue, TodoListItemCollection } from 'model/TodoListItem';
import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applySetNextCurrentItem,
    applySetPreviousCurrentItem,
} from '../utility/todoContextStateMutators';

export type MoveToNextHandler = () => void;

export type MoveToPreviousHandler = () => void;

export default function useNavigateThroughItems(
    isEditing: boolean,
    filteredItems: TodoListItemCollection<ParsedTodoValue | string>,
    setTodoContextState: TodoContextStateSetter,
) {
    const moveToNext: MoveToNextHandler = () => {
        if (isEditing) {
            return;
        }

        // use filteredItems to determine next, to make sure the cursor
        // does not fall on a hidden item
        setTodoContextState((currentState) =>
            applySetNextCurrentItem(currentState, filteredItems),
        );
    };

    const moveToPrevious: MoveToPreviousHandler = () => {
        if (isEditing) {
            return;
        }

        // use filteredItems to determine previous, to make sure the cursor
        // does not fall on a hidden item
        setTodoContextState((currentState) =>
            applySetPreviousCurrentItem(currentState, filteredItems),
        );
    };

    return { moveToNext, moveToPrevious };
}
