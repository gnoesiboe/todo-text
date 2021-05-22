import { TodoListItemCollection } from '../../../model/TodoListItem';
import { Dispatch, SetStateAction } from 'react';
import {
    applyToggleSubItemDoneValueChange,
    applyUpdate,
} from '../utility/todosMutators';
import { persistItemUpdate } from '../../../repository/todoListItemRepository';

export type ToggleSubItemDoneStatusHandler = (
    index: number,
) => Promise<boolean>;

export default function useManageSubItemDoneStatus(
    items: TodoListItemCollection,
    setItems: Dispatch<SetStateAction<TodoListItemCollection>>,
    getCurrentItemId: () => string | null,
    setIsSaving: Dispatch<SetStateAction<boolean>>,
) {
    const toggleSubItemDoneStatus: ToggleSubItemDoneStatusHandler = async (
        itemIndex,
    ) => {
        const currentItemId = getCurrentItemId();

        if (!currentItemId) {
            return false;
        }

        const currentItem = items.find(
            (cursorItem) => cursorItem.id === currentItemId,
        );

        if (!currentItem) {
            return false;
        }

        const updatedValue = applyToggleSubItemDoneValueChange(
            currentItem.value,
            itemIndex,
        );

        setItems((currentItems) =>
            applyUpdate(currentItems, currentItemId, { value: updatedValue }),
        );

        setIsSaving(true);

        const success = await persistItemUpdate(currentItemId, {
            value: updatedValue,
        });

        setIsSaving(false);

        return success;
    };

    return { toggleSubItemDoneStatus };
}
