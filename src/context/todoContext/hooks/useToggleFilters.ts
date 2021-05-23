import { ParsedTodoValue, TodoListItemCollection } from 'model/TodoListItem';
import {
    AppliedFilters,
    TodoContextStateSetter,
} from './useManageTodoContextState';
import { applyToggleAppliedFilterValue } from '../utility/todoContextStateMutators';
import useDisableHideEveningFilterWhenEvening from './useDisableHideEveningFilterWhenEvening';
import {
    resolveFilteredItems,
    resolveMatchingFilters,
} from '../utility/filterResolvers';

export type ToggleHideNotWaitingHandler = () => void;
export type ToggleHideDoneHandler = () => void;
export type ToggleHideEveningHandler = () => void;
export type ToggleHideSnoozedHandler = () => void;
export type ToggleHideNonePriorityHandler = () => void;

export default function useToggleFilters(
    items: TodoListItemCollection<ParsedTodoValue>,
    appliedFilters: AppliedFilters,
    setTodoContextState: TodoContextStateSetter,
) {
    useDisableHideEveningFilterWhenEvening(appliedFilters, setTodoContextState);

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

    const matchingFilters = resolveMatchingFilters(items);

    const filteredItems = resolveFilteredItems(items, appliedFilters);

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
