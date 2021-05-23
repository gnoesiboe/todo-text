import { InexactDateInidicator } from 'utility/dateTimeUtilities';
import { TodoListItemCollection } from 'model/TodoListItem';
import { persistItemUpdate } from '../../../repository/todoListItemRepository';
import { applySnoozeItemUntilToValue } from '../utility/valuMutators';
import { notifyError } from '../../../utility/notifier';
import { TodoContextStateSetter } from './useManageTodoContextState';
import {
    applyItemUpdatesAndStartSaving,
    applyStopSaving,
} from '../utility/todoContextStateMutators';

export type SnoozeCurrentItemUntilHandler = (
    until: InexactDateInidicator,
) => Promise<boolean>;

export default function useSnoozeCurrentItem(
    items: TodoListItemCollection,
    setTodoContextState: TodoContextStateSetter,
    currentItemId: string | null,
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
        // @todo move to modifier somewhere
        setTodoContextState((currentState) => {
            if (!currentState.currentItemId) {
                throw new Error(
                    'Expecting current item to be available at this point',
                );
            }

            return applyItemUpdatesAndStartSaving(
                currentState,
                currentState.currentItemId,
                {
                    value: newValue,
                },
            );
        });

        // Persist change to server
        const success = persistItemUpdate(currentItemId, { value: newValue });

        setTodoContextState((currentState) => applyStopSaving(currentState));

        if (!success) {
            notifyError(
                'Could not persist update to backend. Please refresh the page.',
            );
        }

        return success;
    };

    return snoozeCurrentItemUntil;
}
