import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyClearCurrentItemId,
    applySetCurrentItemId,
    applyToggleCurrentItemId,
} from '../utility/todoContextStateMutators';

export type ToggleCurrentItemHandler = (id: string) => void;

export type MarkCurrentItemHandler = (id: string) => void;

export type ClearCurrentItemHandler = () => void;

export default function useManageCurrentItem(
    setTodoContextState: TodoContextStateSetter,
) {
    const toggleCurrentItem: ToggleCurrentItemHandler = (id) => {
        setTodoContextState((currentState) =>
            applyToggleCurrentItemId(currentState, id),
        );
    };

    const markCurrentItem: MarkCurrentItemHandler = (id) => {
        setTodoContextState((currentState) =>
            applySetCurrentItemId(currentState, id),
        );
    };

    const clearCurrentItem: ClearCurrentItemHandler = () => {
        setTodoContextState((currentState) => {
            if (
                currentState.statuses.isEditing ||
                !currentState.currentItemId
            ) {
                return currentState;
            }

            return applyClearCurrentItemId(currentState);
        });
    };

    return { toggleCurrentItem, markCurrentItem, clearCurrentItem };
}
