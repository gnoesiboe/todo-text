import { InexactDateInidicator } from 'utility/dateTimeUtilities';
import { TodoListItemCollection } from 'model/TodoListItem';
import { Dispatch, SetStateAction } from 'react';
import { applySnoozeItemUntil } from '../utility/todosMutators';

export type SnoozeCurrentItemUntilHandler = (
    until: InexactDateInidicator,
) => void;

export default function useSnoozeCurrentItem(
    setItems: Dispatch<SetStateAction<TodoListItemCollection>>,
    currentItem: string | null,
) {
    const snoozeCurrentItemUntil: SnoozeCurrentItemUntilHandler = (until) => {
        if (!currentItem) {
            return;
        }

        setItems((currentItems) =>
            applySnoozeItemUntil(currentItems, currentItem, until),
        );
    };

    return snoozeCurrentItemUntil;
}
