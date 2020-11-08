import { checkItIsCurrentlyEvening } from './../../../utility/dateTimeUtilities';
import {
    TodoListItem,
    isActionable,
    isHeading,
    isEvening,
    isSnoozed,
    isWaiting,
} from './../../../model/TodoListItem';
import { useState, useEffect } from 'react';

export type ToggleHideNotWaitingHandler = () => void;
export type ToggleHideDoneHandler = () => void;
export type ToggleHideEveningHandler = () => void;
export type ToggleHideSnoozedHandler = () => void;

export type MatchingFilters = {
    waiting: number;
    done: number;
    evening: number;
    snoozed: number;
};

const eveningCheckInterval = 10000; // 10 minutes

export default function useToggleFilters(items: TodoListItem[]) {
    const [hideNotActionable, setHideNotActionable] = useState<boolean>(false);
    const [hideDone, setHideDone] = useState<boolean>(false);
    const [hideEvening, setHideEvening] = useState<boolean>(
        !checkItIsCurrentlyEvening(),
    );
    const [hideSnoozed, setHideSnoozed] = useState<boolean>(true);

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

    const matchingFilters = items.reduce<MatchingFilters>(
        (matches, item) => {
            if (isWaiting(item)) {
                matches.waiting++;
            }

            if (item.done) {
                matches.done++;
            }

            if (isEvening(item)) {
                matches.evening++;
            }

            if (isSnoozed(item)) {
                matches.snoozed++;
            }

            return matches;
        },
        {
            waiting: 0,
            done: 0,
            evening: 0,
            snoozed: 0,
        },
    );

    const filteredItems = items.filter((item) => {
        if (hideNotActionable && !isActionable(item) && !isHeading(item)) {
            return false;
        }

        if (hideDone && item.done) {
            return false;
        }

        if (isEvening(item) && hideEvening) {
            return false;
        }

        if (isSnoozed(item) && hideSnoozed) {
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
        matchingFilters,
        filteredItems,
    };
}
