import { useTodoContext } from 'context/todoContext/TodoContext';
import { DragObjectWithType } from 'react-dnd';
import { ParsedTodoValue, TodoListItem } from 'model/TodoListItem';
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
    item: TodoListItem<ParsedTodoValue | string>,
) {
    const { isSorting } = useTodoContext();

    const dragPreviewRef = useRef<HTMLDivElement>(null);

    const allowDragDrop = !isEditing && isSorting;

    const { isDragging, applyDragHandle, applyDragPreview } = useDragItem(
        item,
        index,
        allowDragDrop,
    );

    const { applyDrop } = useDropItem(dragPreviewRef, index);

    applyDragHandle(applyDragPreview(applyDrop(dragPreviewRef)));

    return { dragPreviewRef, isDragging };
}
