import { useTodoContext } from './../../../context/todoContext/TodoContext';

export default function useCountAppliedFilters(): number {
    const {
        hideDone,
        hideEvening,
        hideSnoozed,
        hideNotActionable,
        matchingFilters,
    } = useTodoContext();

    let totalCount = 0;

    if (hideDone) {
        totalCount += matchingFilters.done;
    }

    if (hideEvening) {
        totalCount += matchingFilters.evening;
    }

    if (hideSnoozed) {
        totalCount += matchingFilters.snoozed;
    }

    if (hideNotActionable) {
        totalCount += matchingFilters.notActionable;
    }

    return totalCount;
}
