import React from 'react';
import {
    TodoListItem as ItemModel,
    isMust,
    isWaiting,
    isQuickfix,
    isActionable,
    isHeading,
    hasNotes,
} from '../../model/TodoListItem';
import EditTodo from '../editTodo/EditTodo';
import { prepareForVisibility } from './utility/visibilityUtilities';
import useToggleCurrentOnClick from './hooks/useToggleCurrentOnClick';
import useHandleDoneStatusChange from './hooks/useHandleDoneStatusChange';
import {
    Container,
    Checkbox,
    Value,
    WaitingIcon,
    QuickfixIcon,
    DragHandle,
    HasNotesIndicator,
} from './components/StyledComponents';
import DeleteTodo from '../deleteTodo/DeleteTodo';
import { UnfoldIcon } from '@primer/octicons-react';
import { useTodoContext } from '../../context/todoContext/TodoContext';
import useStartEditingOnKeyDown from './hooks/useStartEditingOnKeyDown';
import useStartEditOnDoubleClick from './hooks/useStartEditOnDoubleClick';
import useDragAndDrop from './hooks/useDragAndDrop';

type Props = {
    item: ItemModel;
    current: boolean;
    index: number;
};

const TodoListItem: React.FC<Props> = ({ item, current, index }) => {
    const { isEditing } = useTodoContext();

    const { dragPreviewRef, dragHandleRef, isDragging } = useDragAndDrop(
        isEditing,
        index,
        item,
    );

    const { onClick } = useToggleCurrentOnClick(item);

    const { onDoubleClick } = useStartEditOnDoubleClick(item);

    const { onDoneChanged } = useHandleDoneStatusChange(item);

    useStartEditingOnKeyDown(current);

    const waiting = isWaiting(item);
    const showStatusIcon =
        ((!isEditing && current) || !current) && !item.done && !isDragging;

    return (
        <Container
            item={item}
            current={current}
            isEditing={isEditing}
            ref={dragPreviewRef}
            isDragging={isDragging}
        >
            <>
                {/* @ts-ignore don't know how to fix ref */}
                <DragHandle ref={dragHandleRef} current={current}>
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

                {current && isEditing ? (
                    <EditTodo item={item} />
                ) : (
                    <Value
                        item={item}
                        isDragging={isDragging}
                        onDoubleClick={onDoubleClick}
                        onClick={onClick}
                        dangerouslySetInnerHTML={{
                            __html: prepareForVisibility(item),
                        }}
                        current={current}
                    />
                )}
                {hasNotes(item) && !current && <HasNotesIndicator />}
                <DeleteTodo item={item} visible={current} />
            </>
        </Container>
    );
};

export default TodoListItem;
