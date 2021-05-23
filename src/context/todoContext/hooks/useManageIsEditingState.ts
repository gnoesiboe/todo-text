import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyStartEditing,
    applyStopEditing,
} from '../utility/todoContextStateMutators';

export type StopEditHandler = () => void;

export type StartEditHandler = (ignoreCurrentItem?: boolean) => void;

export default function useManageIsEditingState(
    currentItemId: string | null,
    setTodoContextState: TodoContextStateSetter,
) {
    const stopEdit: StopEditHandler = () => {
        setTodoContextState((currentState) => applyStopEditing(currentState));
    };

    const startEdit: StartEditHandler = (
        ignoreCurrentItem: boolean = false,
    ) => {
        if (currentItemId || ignoreCurrentItem) {
            setTodoContextState((currentState) =>
                applyStartEditing(currentState),
            );
        }
    };

    return { stopEdit, startEdit };
}
