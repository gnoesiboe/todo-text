import { TodoListItem } from '../../../model/TodoListItem';
import { NextAction } from '../hooks/useManageTodoListItems';

export function determineNextCurrentItem(
    nextAction: NextAction,
    currentItem: string | null,
    items: TodoListItem[],
): string | null {
    const currentIndex = items.findIndex(
        (cursorItem) => cursorItem.id === currentItem,
    );

    if (items.length === 0) {
        return null;
    }

    switch (nextAction) {
        case NextAction.None:
            return null;

        case NextAction.EditNext:
            if (currentIndex === -1) {
                return items[0].id;
            }

            return items[currentIndex + 1]?.id || null;

        case NextAction.EditPrevious:
            if (currentIndex === -1) {
                return items[items.length - 1].id;
            }

            const previousIndex = currentIndex - 1;

            return previousIndex >= 0 ? items[previousIndex].id : null;

        case NextAction.CreateNewAfter:
            if (currentIndex === -1) {
                return currentItem;
            }

            return items[currentIndex + 1].id;

        case NextAction.CreateNewBefore:
            if (currentIndex === -1) {
                return currentItem;
            }

            return items[currentIndex - 1]?.id || null;

        default:
            return currentItem;
    }
}
