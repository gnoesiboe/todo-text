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
import useScrollIntoView from './hooks/useScrollIntoView';
import { determineProgress } from './utility/selectors';
import ProgressBar from '../../primitives/ProgressBar/ProgressBar';
import { AutoHeightAnimate } from 'react-animate-auto-height';
import StatusIndicatorContainer from './components/StatusIndicatorContainer';
import EditTodoButton from './components/EditTodoButton';

type Props = {
    item: ItemModel;
    current: boolean;
    index: number;
};

const TodoListItem: React.FC<Props> = ({ item, current, index }) => {
    const { isEditing, stopEdit, startEdit } = useTodoContext();

    const { dragPreviewRef, dragHandleRef, isDragging } = useDragAndDrop(
        isEditing,
        index,
        item,
    );

    const { onClick } = useToggleCurrentOnClick(item);

    const { onDoubleClick } = useStartEditOnDoubleClick(item);

    const { onDoneChanged } = useHandleDoneStatusChange(item);

    useScrollIntoView(dragPreviewRef, current);

    useStartEditingOnKeyDown(current);

    const waiting = isWaiting(item);
    const showStatusIcon = !item.done && !isDragging;

    const { done, todo, total } = determineProgress(item);

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
                <StatusIndicatorContainer>
                    {waiting && showStatusIcon && <WaitingIcon />}
                    {isQuickfix(item) && !waiting && showStatusIcon && (
                        <QuickfixIcon />
                    )}
                </StatusIndicatorContainer>
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
                    <EditTodo item={item} onCancel={() => stopEdit()} />
                ) : (
                    <AutoHeightAnimate heightState={current}>
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
                    </AutoHeightAnimate>
                )}
                {!isEditing && current && (
                    <EditTodoButton onClick={() => startEdit()} />
                )}
                {current && (
                    <DeleteTodo item={item} visible={current && !isEditing} />
                )}
                {!item.done && (
                    <ProgressBar done={done} todo={todo} total={total} />
                )}
                {hasNotes(item) && !current && <HasNotesIndicator />}
            </>
        </Container>
    );
};

export default TodoListItem;
