import { TodoListItemCollection } from '../../../model/TodoListItem';
import { applyToggleSubItemDoneValueChange } from '../utility/todosMutators';
import { persistItemUpdate } from '../../../repository/todoListItemRepository';
import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyStopSaving,
    applyUpdateCurrentItemValueAndStartSaving,
} from '../utility/todoContextStateMutators';

export type ToggleSubItemDoneStatusHandler = (
    index: number,
) => Promise<boolean>;

export default function useManageSubItemDoneStatus(
    items: TodoListItemCollection,
    setTodoContextState: TodoContextStateSetter,
    currentItemId: string | null,
) {
    const toggleSubItemDoneStatus: ToggleSubItemDoneStatusHandler = async (
        itemIndex,
    ) => {
        if (!currentItemId) {
            return false;
        }

        const currentItem = items.find(
            (cursorItem) => cursorItem.id === currentItemId,
        );

        if (!currentItem) {
            return false;
        }

        // optimistic updating
        const updatedValue = applyToggleSubItemDoneValueChange(
            currentItem.value,
            itemIndex,
        );

        setTodoContextState((currentState) =>
            applyUpdateCurrentItemValueAndStartSaving(
                currentState,
                updatedValue,
            ),
        );

        // persist changes to backend
        const success = await persistItemUpdate(currentItemId, {
            value: updatedValue,
        });

        setTodoContextState((currentState) => applyStopSaving(currentState));

        return success;
    };

    return { toggleSubItemDoneStatus };
}
