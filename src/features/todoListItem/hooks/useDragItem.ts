import { TodoListItem } from './../../../model/TodoListItem';
import { useDrag } from 'react-dnd';
import { DragObject, dragDropItemType } from '../TodoListItem';

type CollectedProps = {
    isDragging: boolean;
};

export default function useDragItem(item: TodoListItem, index: number) {
    const [{ isDragging }, applyDrag] = useDrag<DragObject, {}, CollectedProps>(
        {
            item: { id: item.id, index, type: dragDropItemType },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        },
    );

    return { isDragging, applyDrag };
}
