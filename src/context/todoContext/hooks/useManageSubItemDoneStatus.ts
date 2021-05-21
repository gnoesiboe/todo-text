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

        return await persistItemUpdate(currentItemId, { value: updatedValue });
    };

    return { toggleSubItemDoneStatus };
}
