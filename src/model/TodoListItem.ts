export interface TodoListItem {
    id: string;
    value: string;
    done: boolean;
}

export const isCancelled = (item: TodoListItem) =>
    !!item.value.match(/^~~[^~]+~~$/);

export const isHeading = (item: TodoListItem) => !!item.value.match(/^# .*$/);

export const isMust = (item: TodoListItem) => !!item.value.match(/@must/);
