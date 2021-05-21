import { FirestoreTodoListItem } from '../firebase/model/FirestoreTodoListItem';

export type TodoListItem<ValueType = string> = {
    id: string;
    userId: FirestoreTodoListItem['userId'];
    value: ValueType;
    done: FirestoreTodoListItem['done'];
    rank: FirestoreTodoListItem['rank'];
};

export type TodoListItemCollection<ValueType = string> = Array<
    TodoListItem<ValueType>
>;

export type ParsedTodoNote = {
    note: string;
    isTodo: boolean;
    done: boolean | null;
};

export type ParsedTodoProgress = {
    done: number;
    todo: number;
    total: number;
};

export type ParsedTodoValue = {
    raw: string;
    summary: string;
    notes: Array<ParsedTodoNote>;
    progress: ParsedTodoProgress;
    isCancelled: boolean;
    isHeading: boolean;
    isMust: boolean;
    isWaiting: boolean;
    isQuickfix: boolean;
    snoozedUntil: Date | null;
    isSnoozed: boolean;
    isEvening: boolean;
    isActionable: boolean;
};

export type TodoListItemCollectionUpdates = Record<
    string,
    Partial<Omit<TodoListItem, 'id'>>
>;
