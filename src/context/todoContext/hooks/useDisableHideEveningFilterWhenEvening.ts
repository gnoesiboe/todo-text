import { useEffect } from 'react';
import { checkItIsCurrentlyEvening } from '../../../utility/dateTimeUtilities';
import { applySetAppliedFilterValue } from '../utility/todoContextStateMutators';
import {
    AppliedFilters,
    TodoContextStateSetter,
} from './useManageTodoContextState';

const eveningCheckInterval = 10000; // 10 minutes

export default function useDisableHideEveningFilterWhenEvening(
    appliedFilters: AppliedFilters,
    setTodoContextState: TodoContextStateSetter,
) {
    useEffect(() => {
        const intervalHandle = setInterval(() => {
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

        return () => clearInterval(intervalHandle);
    }, [setTodoContextState, appliedFilters]);
}
