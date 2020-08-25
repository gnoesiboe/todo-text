import { createInitialCollection } from './../factory/todoListItemFactory';
import type { TodoListItem } from './../TodoListItem';

import {
    get as getFromStorage,
    write as writeToStorage,
} from '@freshheads/javascript-essentials/build/storage/localStorage';

const storageNamespace = 'todos';

export function save(items: TodoListItem[]) {
    // @ts-ignore → somehow Typescript considers items not serializable
    writeToStorage(storageNamespace, items, true);
}

export function get(): TodoListItem[] {
    const fromStorage = getFromStorage(storageNamespace, true);

    if (fromStorage) {
        const parsed = JSON.parse(fromStorage);

        if (Array.isArray(parsed)) {
            return parsed;
        }
    }

    return createInitialCollection();
}
