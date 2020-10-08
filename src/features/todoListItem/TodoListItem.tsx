import React, { useRef } from 'react';
import {
    TodoListItem as ItemModel,
    isMust,
    isWaiting,
    isQuickfix,
    isActionable,
    isHeading,
} from '../../model/TodoListItem';
import EditTodo from '../editTodo/EditTodo';
import { prepareForVisibility } from './utility/visibilityUtilities';
import useSwitchToEditModeOnSwitch from './hooks/useSwitchToEditModeOnClick';
import useHandleDoneStatusChange from './hooks/useHandleDoneStatusChange';
import {
    Container,
    Checkbox,
    Value,
    WaitingIcon,
    QuickfixIcon,
    DragHandle,
} from './components/StyledComponents';
import DeleteTodo from '../deleteTodo/DeleteTodo';
import { DragObjectWithType } from 'react-dnd';
import useDragItem from './hooks/useDragItem';
import useDropItem from './hooks/useDropItem';
import { UnfoldIcon } from '@primer/octicons-react';

export type OnChangeHandler = (
    id: string,
    value: string,
    done: boolean,
) => void;

export type OnDeleteHandler = (id: string) => void;

export type OnModeChangeHandler = (id: string) => void;

type Props = {
    item: ItemModel;
    current: boolean;
    index: number;
    hidden: boolean;
};

export interface DragObject extends DragObjectWithType {
    id: string;
    index: number; // remove if not needed
}

export const dragDropItemType = 'only';

const TodoListItem: React.FC<Props> = ({ item, current, index, hidden }) => {
    const dragPreviewRef = useRef<HTMLDivElement>(null);
    const dragHandleRef = useRef<HTMLDivElement>(null);

    const { onClick } = useSwitchToEditModeOnSwitch(item);

    const { onDoneChanged } = useHandleDoneStatusChange(item);

    const allowDragDrop = !current;

    const { isDragging, applyDragHandle, applyDragPreview } = useDragItem(
        item,
        index,
        allowDragDrop,
    );

    const { applyDrop } = useDropItem(dragPreviewRef, index);

    applyDragPreview(applyDrop(dragPreviewRef));
    applyDragHandle(dragHandleRef);

    const waiting = isWaiting(item);
    const showStatusIcon = !current && !item.done && !isDragging;

    return (
        <Container
            item={item}
            current={current}
            ref={dragPreviewRef}
            isDragging={isDragging}
            hidden={hidden}
        >
            <>
                {/* @ts-ignore don't know how to fix ref */}
                <DragHandle ref={dragHandleRef}>
                    <UnfoldIcon />
                </DragHandle>
                {waiting && showStatusIcon && (
                    <span title="Waiting..">
                        <WaitingIcon />
                    </span>
                )}
                {isQuickfix(item) && !waiting && showStatusIcon && (
                    <span title="Quickfix">
                        <QuickfixIcon />
                    </span>
                )}
                {!isHeading(item) && (
                    <Checkbox
                        item={item}
                        isDragging={isDragging}
                        accented={isMust(item)}
                        checked={item.done}
                        muted={item.done}
                        onChange={onDoneChanged}
                        disabled={!isActionable(item)}
                    />
                )}

                {current ? (
                    <EditTodo item={item} />
                ) : (
                    <Value
                        item={item}
                        isDragging={isDragging}
                        onClick={onClick}
                        dangerouslySetInnerHTML={{
                            __html: prepareForVisibility(item),
                        }}
                    />
                )}
                <DeleteTodo item={item} />
            </>
        </Container>
    );
};

export default TodoListItem;
