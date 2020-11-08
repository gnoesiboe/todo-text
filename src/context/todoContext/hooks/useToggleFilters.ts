import { checkItIsCurrentlyEvening } from './../../../utility/dateTimeUtilities';
import {
    TodoListItem,
    isActionable,
    isHeading,
    isEvening,
} from './../../../model/TodoListItem';
import { useState, useEffect } from 'react';

export type ToggleHideNotWaitingHandler = () => void;
export type ToggleHideDoneHandler = () => void;
export type ToggleHideEveningHandler = () => void;
export type ToggleHideSnoozedHandler = () => void;

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
        filteredItems,
    };
}
