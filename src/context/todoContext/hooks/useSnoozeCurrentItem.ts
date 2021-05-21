import { InexactDateInidicator } from 'utility/dateTimeUtilities';
import { TodoListItemCollection } from 'model/TodoListItem';
import { Dispatch, SetStateAction } from 'react';
import { applySnoozeItemUntil } from '../utility/todosMutators';

export type SnoozeCurrentItemUntilHandler = (
    until: InexactDateInidicator,
) => void;

export default function useSnoozeCurrentItem(
    setItems: Dispatch<SetStateAction<TodoListItemCollection>>,
    currentItemId: string | null,
) {
    const snoozeCurrentItemUntil: SnoozeCurrentItemUntilHandler = (until) => {
        if (!currentItemId) {
            return;
        }

        setItems((currentItems) =>
            applySnoozeItemUntil(currentItems, currentItemId, until),
        );
    };

    return snoozeCurrentItemUntil;
}
