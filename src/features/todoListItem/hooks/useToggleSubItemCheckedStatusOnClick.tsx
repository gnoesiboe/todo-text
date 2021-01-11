import { useTodoContext } from 'context/todoContext/TodoContext';
import { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';
import { MouseEventHandler, RefObject, useEffect } from 'react';
import { convertHTMLCollectionToArray } from 'utility/domUtilities';

export default function useToggleSubItemCheckedStatusOnClick(
    containerElRef: RefObject<HTMLDivElement>,
    item: TodoListItem<ParsedTodoValue>,
) {
    const { toggleSubItemDoneStatus } = useTodoContext();

    useEffect(() => {
        const containerEl = containerElRef.current;

        if (!containerEl) {
            return;
        }

        const subItemsEls = convertHTMLCollectionToArray<HTMLButtonElement>(
            containerEl.getElementsByClassName(
                'todo-list-item__value__sub-item',
            ),
        );

        const onButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
            event.stopPropagation();
            event.preventDefault();

            const targetEl = event.target as HTMLButtonElement;

            const index = subItemsEls.indexOf(targetEl);

            if (index === -1) {
                return;
            }

            toggleSubItemDoneStatus(index);
        };

        subItemsEls.forEach((subItemEl) => {
            // @ts-ignore → don't know why this is not working..
            subItemEl.addEventListener('click', onButtonClick);
        });

        return () => {
            subItemsEls.forEach((subItemEl) => {
                // @ts-ignore → don't know why this is not working..
                subItemEl.removeEventListener('click', onButtonClick);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerElRef, item.value.raw]);
}
