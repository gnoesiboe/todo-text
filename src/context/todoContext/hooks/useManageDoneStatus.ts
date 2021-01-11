import { TodoListItemCollection } from './../../../model/TodoListItem';
import { Dispatch, SetStateAction } from 'react';
import {
    applyToggleDoneStatus,
    applyToggleSubItemDoneStatus,
} from '../utility/todosMutators';

export type ToggleDoneStatusHandler = () => void;

export type ToggleSubItemDoneStatusHandler = (index: number) => void;

export default function useManageDoneStatus(
    setItems: Dispatch<SetStateAction<TodoListItemCollection>>,
    getCurrentItem: () => string | null,
    isEditing: boolean,
) {
    const toggleDoneStatus: ToggleDoneStatusHandler = () => {
        const currentItem = getCurrentItem();

        if (!currentItem || isEditing) {
            return;
        }

        setItems((currentItems) =>
            applyToggleDoneStatus(currentItems, currentItem),
        );
    };

    const toggleSubItemDoneStatus: ToggleSubItemDoneStatusHandler = (
        itemIndex,
    ) => {
        const currentItem = getCurrentItem();

        if (!currentItem) {
            return;
        }

        setItems((currentItems) =>
            applyToggleSubItemDoneStatus(currentItems, currentItem, itemIndex),
        );
    };

    return { toggleDoneStatus, toggleSubItemDoneStatus };
}
