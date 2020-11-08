import { useTodoContext } from './../../../context/todoContext/TodoContext';

export default function useCountAppliedFilters(): number {
    const {
        hideDone,
        hideEvening,
        hideSnoozed,
        hideNotActionable,
    } = useTodoContext();

    return [hideDone, hideEvening, hideSnoozed, hideNotActionable].filter(
        (value) => !!value,
    ).length;
}
