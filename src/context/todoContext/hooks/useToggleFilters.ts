import { checkItIsCurrentlyEvening } from 'utility/dateTimeUtilities';
import { ParsedTodoValue, TodoListItemCollection } from 'model/TodoListItem';
import { useState, useEffect } from 'react';

export type ToggleHideNotWaitingHandler = () => void;
export type ToggleHideDoneHandler = () => void;
export type ToggleHideEveningHandler = () => void;
export type ToggleHideSnoozedHandler = () => void;
export type ToggleHideNonePriorityHandler = () => void;

export type MatchingFilters = {
    notActionable: number;
    done: number;
    evening: number;
    snoozed: number;
    nonePriority: number;
};

const eveningCheckInterval = 10000; // 10 minutes

export default function useToggleFilters(
    items: TodoListItemCollection<ParsedTodoValue>,
) {
    const [hideNotActionable, setHideNotActionable] = useState<boolean>(false);
    const [hideDone, setHideDone] = useState<boolean>(false);
    const [hideEvening, setHideEvening] = useState<boolean>(
        !checkItIsCurrentlyEvening(),
    );
    const [hideSnoozed, setHideSnoozed] = useState<boolean>(true);
    const [hideNonePriority, setHideNonePriority] = useState<boolean>(false);

    useEffect(() => {
        const reference = setInterval(() => {
            if (checkItIsCurrentlyEvening() && hideEvening) {
                setHideEvening(true);
            }
        }, eveningCheckInterval);

        return () => clearInterval(reference);
    }, [setHideEvening, hideEvening]);

    const toggleHideNotActionable: ToggleHideNotWaitingHandler = () => {
        setHideNotActionable((currentValue) => !currentValue);
    };

    const toggleHideDone: ToggleHideDoneHandler = () => {
        setHideDone((currentValue) => !currentValue);
    };

    const toggleHideEvening: ToggleHideEveningHandler = () => {
        setHideEvening((currentValue) => !currentValue);
    };

    const toggleHideSnoozed: ToggleHideSnoozedHandler = () => {
        setHideSnoozed((currentValue) => !currentValue);
    };

    const toggleHideNonePriority: ToggleHideNonePriorityHandler = () => {
        setHideNonePriority((currentValue) => !currentValue);
    };

    const matchingFilters = items.reduce<MatchingFilters>(
        (matches, item) => {
            if (item.value.isWaiting) {
                matches.notActionable++;
            }

            if (item.done) {
                matches.done++;
            }

            if (item.value.isEvening) {
                matches.evening++;
            }

            if (item.value.isSnoozed) {
                matches.snoozed++;
            }

            if (!item.value.isMust) {
                matches.nonePriority++;
            }

            return matches;
        },
        {
            notActionable: 0,
            done: 0,
            evening: 0,
            snoozed: 0,
            nonePriority: 0,
        },
    );

    const filteredItems = items.filter((item) => {
        if (
            hideNotActionable &&
            !item.value.isActionable &&
            !item.value.isHeading
        ) {
            return false;
        }

        if (hideDone && item.done) {
            return false;
        }

        if (item.value.isEvening && hideEvening) {
            return false;
        }

        if (item.value.isSnoozed && hideSnoozed) {
            return false;
        }

        // include headings to still be able to group todo's
        if (!item.value.isMust && hideNonePriority && !item.value.isHeading) {
            return false;
        }

        return true;
    });

    return {
        hideNotActionable,
        toggleHideNotActionable,
        hideDone,
        toggleHideDone,
        hideEvening,
        toggleHideEvening,
        hideSnoozed,
        toggleHideSnoozed,
        hideNonePriority,
        toggleHideNonePriority,
        matchingFilters,
        filteredItems,
    };
}
