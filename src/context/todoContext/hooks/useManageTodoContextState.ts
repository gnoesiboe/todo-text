import { TodoListItemCollection } from '../../../model/TodoListItem';
import { Dispatch, SetStateAction, useState } from 'react';
import { checkItIsCurrentlyEvening } from '../../../utility/dateTimeUtilities';

export type TodoContextStateSetter = Dispatch<SetStateAction<TodoContextState>>;

export type AppliedFilters = {
    hideNotActionable: boolean;
    hideDone: boolean;
    hideEvening: boolean;
    hideSnoozed: boolean;
    hideNonPriority: boolean;
};

export type Statuses = {
    isSaving: boolean;
    isFetching: boolean;
    isEditing: boolean;
    isSorting: boolean;
};

export type TodoContextState = {
    currentItemId: string | null;
    items: TodoListItemCollection;
    statuses: Statuses;
    appliedFilters: AppliedFilters;
};

export default function useManageTodoContextState() {
    const [todoContextState, setTodoContextState] = useState<TodoContextState>({
        currentItemId: null,
        items: [],
        statuses: {
            isSaving: false,
            isFetching: false,
            isEditing: false,
            isSorting: false,
        },
        appliedFilters: {
            hideNotActionable: false,
            hideDone: false,
            hideEvening: !checkItIsCurrentlyEvening(),
            hideSnoozed: true,
            hideNonPriority: false,
        },
    });

    return { todoContextState, setTodoContextState };
}
