import {
    TodoListItem,
    isActionable,
    isHeading,
} from './../../../model/TodoListItem';
import { useState } from 'react';

export type ToggleHideNotWaitingHandler = () => void;
export type ToggleHideDoneHandler = () => void;

export default function useToggleFilters(items: TodoListItem[]) {
    const [hideNotActionable, setHideNotActionable] = useState<boolean>(false);
    const [hideDone, setHideDone] = useState<boolean>(false);

    const toggleHideNotActionable: ToggleHideNotWaitingHandler = () => {
        setHideNotActionable((currentValue) => !currentValue);
    };

    const toggleHideDone: ToggleHideDoneHandler = () => {
        setHideDone((currentValue) => !currentValue);
    };

    const filteredItems = items.filter((item) => {
        if (hideNotActionable && !isActionable(item) && !isHeading(item)) {
            return false;
        }

        if (hideDone && item.done) {
            return false;
        }

        return true;
    });

    return {
        hideNotActionable,
        toggleHideNotActionable,
        hideDone,
        toggleHideDone,
        filteredItems,
    };
}
