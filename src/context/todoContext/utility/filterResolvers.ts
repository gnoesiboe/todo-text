import {
    ParsedTodoValue,
    TodoListItemCollection,
} from '../../../model/TodoListItem';
import { AppliedFilters } from '../hooks/useManageTodoContextState';

export type MatchingFilters = {
    notActionable: number;
    done: number;
    evening: number;
    snoozed: number;
    nonePriority: number;
};

export const resolveMatchingFilters = (
    items: TodoListItemCollection<ParsedTodoValue>,
) => {
    return items.reduce<MatchingFilters>(
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
};

export const resolveFilteredItems = (
    items: TodoListItemCollection<ParsedTodoValue>,
    appliedFilters: AppliedFilters,
): TodoListItemCollection<ParsedTodoValue> => {
    return items.filter((item) => {
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
};
