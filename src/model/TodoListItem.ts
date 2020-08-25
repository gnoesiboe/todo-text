export enum Mode {
    Edit = 'edit',
    View = 'view',
}

export interface TodoListItem {
    id: string;
    value: string;
    done: boolean;
    mode: Mode;
}

export const isCancelled = (item: TodoListItem) =>
    !!item.value.match(/^~~[^~]+~~$/);

export const isHeading = (item: TodoListItem) => !!item.value.match(/^# .*$/);
