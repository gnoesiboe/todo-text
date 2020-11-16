import { DragObjectWithType } from 'react-dnd';
import { TodoListItem } from './../../../model/TodoListItem';
import { useRef } from 'react';
import useDragItem from './useDragItem';
import useDropItem from './useDropItem';

export interface DragObject extends DragObjectWithType {
    id: string;
    index: number; // remove if not needed
}

export const dragDropItemType = 'only';

export default function useDragAndDrop(
    isEditing: boolean,
    index: number,
    item: TodoListItem,
) {
    const dragPreviewRef = useRef<HTMLDivElement>(null);
    // const dragHandleRef = useRef<HTMLDivElement>(null);

    const allowDragDrop = !isEditing;

    const { isDragging, applyDragHandle, applyDragPreview } = useDragItem(
        item,
        index,
        allowDragDrop,
    );

    const { applyDrop } = useDropItem(dragPreviewRef, index);

    applyDragPreview(applyDrop(dragPreviewRef));
    applyDragHandle(dragPreviewRef);

    return { dragPreviewRef, isDragging };
}
