import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyStartEditing,
    applyStopEditing,
} from '../utility/todoContextStateMutators';

export type StopEditHandler = () => void;

export type StartEditHandler = (ignoreCurrentItem?: boolean) => void;

export default function useManageIsEditingState(
    setTodoContextState: TodoContextStateSetter,
) {
    const stopEdit: StopEditHandler = () => {
        setTodoContextState((currentState) => applyStopEditing(currentState));
    };

    const startEdit: StartEditHandler = (
        ignoreCurrentItem: boolean = false,
    ) => {
        setTodoContextState((currentState) => {
            if (!currentState.currentItemId && !ignoreCurrentItem) {
                return currentState;
            }

            return applyStartEditing(currentState);
        });
    };

    return { stopEdit, startEdit };
}
