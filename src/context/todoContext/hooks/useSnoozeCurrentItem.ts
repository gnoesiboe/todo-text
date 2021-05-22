import { InexactDateInidicator } from 'utility/dateTimeUtilities';
import { TodoListItemCollection } from 'model/TodoListItem';
import { Dispatch, SetStateAction } from 'react';
import { applyUpdate } from '../utility/todosMutators';
import { persistItemUpdate } from '../../../repository/todoListItemRepository';
import { applySnoozeItemUntilToValue } from '../utility/valuMutators';
import { notifyError } from '../../../utility/notifier';

export type SnoozeCurrentItemUntilHandler = (
    until: InexactDateInidicator,
) => Promise<boolean>;

export default function useSnoozeCurrentItem(
    items: TodoListItemCollection,
    setItems: Dispatch<SetStateAction<TodoListItemCollection>>,
    currentItemId: string | null,
    setIsSaving: Dispatch<SetStateAction<boolean>>,
) {
    const snoozeCurrentItemUntil: SnoozeCurrentItemUntilHandler = async (
        until,
    ) => {
        if (!currentItemId) {
            return false;
        }

        const currentItem = items.find(
            (cursorItem) => cursorItem.id === currentItemId,
        );

        if (!currentItem) {
            throw new Error(
                'Expecting current item to be available at this point',
            );
        }

        const newValue = applySnoozeItemUntilToValue(currentItem.value, until);

        // optimistic updating
        setItems((currentItems) =>
            applyUpdate(currentItems, currentItemId, {
                value: newValue,
            }),
        );

        setIsSaving(true);

        const success = persistItemUpdate(currentItemId, { value: newValue });

        setIsSaving(false);

        if (!success) {
            notifyError(
                'Could not persist update to backend. Please refresh the page.',
            );
        }

        return success;
    };

    return snoozeCurrentItemUntil;
}
