import { TodoListItem } from 'model/TodoListItem';

export function determineNextCurrentItem(
    currentItem: string | null,
    items: TodoListItem[],
): string | null {
    const currentIndex = items.findIndex(
        (cursorItem) => cursorItem.id === currentItem,
    );

    if (items.length === 0) {
        return null;
    }

    if (currentIndex === -1) {
        return items[0].id;
    }

    return items[currentIndex + 1]?.id || items[0].id;
}

export function determinePreviousCurrentItem(
    currentItem: string | null,
    items: TodoListItem[],
): string | null {
    const currentIndex = items.findIndex(
        (cursorItem) => cursorItem.id === currentItem,
    );

    if (items.length === 0) {
        return null;
    }

    if (currentIndex === -1) {
        return items[items.length - 1].id;
    }

    return items[currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1].id;
}
