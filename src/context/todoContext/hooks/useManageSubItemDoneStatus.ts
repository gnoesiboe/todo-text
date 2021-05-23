import { applyToggleSubItemDoneValueChange } from '../utility/todosMutators';
import { persistItemUpdate } from '../../../repository/todoListItemRepository';
import { TodoContextStateSetter } from './useManageTodoContextState';
import { applyUpdateCurrentItemValue } from '../utility/todoContextStateMutators';

export type ToggleSubItemDoneStatusHandler = (
    index: number,
) => Promise<boolean>;

export default function useManageSubItemDoneStatus(
    setTodoContextState: TodoContextStateSetter,
): ToggleSubItemDoneStatusHandler {
    return async (itemIndex) => {
        // optimistic updating
        setTodoContextState((currentState) => {
            if (!currentState.currentItemId) {
                return currentState;
            }

            const currentItem =
                currentState.items.find(
                    (cursorItem) =>
                        cursorItem.id === currentState.currentItemId,
                ) || null;

            if (!currentItem) {
                return currentState;
            }

            // As somehow the currentItemId is not available as a parameter to this hook (it is probably one render cycle
            // behind), I applied this workaround to be able to persist it. Off course it is bad practise to do this in a
            // setStateAction. @todo find better solution
            const updatedValue = applyToggleSubItemDoneValueChange(
                currentItem.value,
                itemIndex,
            );

            const newState = applyUpdateCurrentItemValue(
                currentState,
                updatedValue,
            );

            // persist changes to backend
            persistItemUpdate(currentItem.id, {
                value: updatedValue,
            });

            return newState;
        });

        return true;
    };
}
