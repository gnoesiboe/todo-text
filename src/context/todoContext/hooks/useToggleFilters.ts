import { checkItIsCurrentlyEvening } from 'utility/dateTimeUtilities';
import { ParsedTodoValue, TodoListItemCollection } from 'model/TodoListItem';
import { useState, useEffect, useMemo } from 'react';
import {
    get as getStoredFilters,
    save,
    StoredFilters,
} from 'model/repository/filterRepository';

export type ToggleHideNotWaitingHandler = () => void;
export type ToggleHideDoneHandler = () => void;
export type ToggleHideEveningHandler = () => void;
export type ToggleHideSnoozedHandler = () => void;

export type MatchingFilters = {
    notActionable: number;
    done: number;
    evening: number;
    snoozed: number;
};

const eveningCheckInterval = 10000; // 10 minutes

export default function useToggleFilters(
    items: TodoListItemCollection<ParsedTodoValue>,
) {
    const persistedFilters = useMemo<StoredFilters | null>(
        () => getStoredFilters(),
        [],
    );

    const [hideNotActionable, setHideNotActionable] = useState<boolean>(
        persistedFilters ? persistedFilters.hideNotActionable : false,
    );
    const [hideDone, setHideDone] = useState<boolean>(
        persistedFilters ? persistedFilters.hideDone : false,
    );
    const [hideEvening, setHideEvening] = useState<boolean>(
        !checkItIsCurrentlyEvening(),
    );
    const [hideSnoozed, setHideSnoozed] = useState<boolean>(
        persistedFilters ? persistedFilters.hideSnoozed : true,
    );

    useEffect(() => {
        const reference = setInterval(() => {
            if (checkItIsCurrentlyEvening() && hideEvening) {
                setHideEvening(true);
            }
        }, eveningCheckInterval);

        return () => clearInterval(reference);
    }, [setHideEvening, hideEvening]);

    // save applied filters in local storage for cross request access
    useEffect(() => {
        save({
            hideNotActionable,
            hideDone,
            hideSnoozed,
        });
    }, [hideNotActionable, hideDone, hideEvening, hideSnoozed]);

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

            return matches;
        },
        {
            notActionable: 0,
            done: 0,
            evening: 0,
            snoozed: 0,
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
