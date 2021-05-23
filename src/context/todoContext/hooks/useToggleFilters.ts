import { checkItIsCurrentlyEvening } from 'utility/dateTimeUtilities';
import { ParsedTodoValue, TodoListItemCollection } from 'model/TodoListItem';
import { useEffect } from 'react';
import {
    AppliedFilters,
    TodoContextStateSetter,
} from './useManageTodoContextState';
import {
    applySetAppliedFilterValue,
    applyToggleAppliedFilterValue,
} from '../utility/todoContextStateMutators';

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
    appliedFilters: AppliedFilters,
    setTodoContextState: TodoContextStateSetter,
) {
    useEffect(() => {
        const reference = setInterval(() => {
            if (checkItIsCurrentlyEvening() && appliedFilters.hideEvening) {
                setTodoContextState((currentState) =>
                    applySetAppliedFilterValue(
                        currentState,
                        'hideEvening',
                        false,
                    ),
                );
            }
        }, eveningCheckInterval);

        return () => clearInterval(reference);
    }, [setTodoContextState, appliedFilters]);

    const toggleHideNotActionable: ToggleHideNotWaitingHandler = () => {
        setTodoContextState((currentState) =>
            applyToggleAppliedFilterValue(currentState, 'hideNotActionable'),
        );
    };

    const toggleHideDone: ToggleHideDoneHandler = () => {
        setTodoContextState((currentState) =>
            applyToggleAppliedFilterValue(currentState, 'hideDone'),
        );
    };

    const toggleHideEvening: ToggleHideEveningHandler = () => {
        setTodoContextState((currentState) =>
            applyToggleAppliedFilterValue(currentState, 'hideEvening'),
        );
    };

    const toggleHideSnoozed: ToggleHideSnoozedHandler = () => {
        setTodoContextState((currentState) =>
            applyToggleAppliedFilterValue(currentState, 'hideSnoozed'),
        );
    };

    const toggleHideNonePriority: ToggleHideNonePriorityHandler = () => {
        setTodoContextState((currentState) =>
            applyToggleAppliedFilterValue(currentState, 'hideNonPriority'),
        );
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
            appliedFilters.hideNotActionable &&
            !item.value.isActionable &&
            !item.value.isHeading
        ) {
            return false;
        }

        if (appliedFilters.hideDone && item.done) {
            return false;
        }

        if (item.value.isEvening && appliedFilters.hideEvening) {
            return false;
        }

        if (item.value.isSnoozed && appliedFilters.hideSnoozed) {
            return false;
        }

        // include headings to still be able to group todo's
        // noinspection RedundantIfStatementJS
        if (
            !item.value.isMust &&
            appliedFilters.hideNonPriority &&
            !item.value.isHeading
        ) {
            return false;
        }

        return true;
    });

    return {
        toggleHideNotActionable,
        toggleHideDone,
        toggleHideEvening,
        toggleHideSnoozed,
        toggleHideNonePriority,
        matchingFilters,
        filteredItems,
    };
}
