import { TodoListItem } from './../../../model/TodoListItem';
import { useDrag } from 'react-dnd';
import { DragObject, dragDropItemType } from '../TodoListItem';

type CollectedProps = {
    isDragging: boolean;
};

export default function useDragItem(
    item: TodoListItem,
    index: number,
    enabled: boolean,
) {
    const [{ isDragging }, applyDragHandle, applyDragPreview] = useDrag<
        DragObject,
        {},
        CollectedProps
    >({
        item: { id: item.id, index, type: dragDropItemType },
        canDrag: enabled,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return { isDragging, applyDragHandle, applyDragPreview };
}
