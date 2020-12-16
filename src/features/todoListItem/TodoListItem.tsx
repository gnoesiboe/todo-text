import React from 'react';
import {
    TodoListItem as ItemModel,
    isMust,
    isWaiting,
    isQuickfix,
    isActionable,
    isHeading,
    hasNotes,
    isSnoozed,
} from 'model/TodoListItem';
import EditTodo from '../editTodo/EditTodo';
import { prepareForVisibility } from './utility/visibilityUtilities';
import useToggleCurrentOnClick from './hooks/useToggleCurrentOnClick';
import useHandleDoneStatusChange from './hooks/useHandleDoneStatusChange';
import HasNotesIndicator from './components/HasNotesIndicator';
import DeleteTodo from '../deleteTodo/DeleteTodo';
import { useTodoContext } from 'context/todoContext/TodoContext';
import useStartEditingOnKeyDown from './hooks/useStartEditingOnKeyDown';
import useStartEditOnDoubleClick from './hooks/useStartEditOnDoubleClick';
import useDragAndDrop from './hooks/useDragAndDrop';
import useScrollIntoView from './hooks/useScrollIntoView';
import { determineProgress } from './utility/selectors';
import ProgressBar from 'primitives/ProgressBar/ProgressBar';
import { AutoHeightAnimate } from 'react-animate-auto-height';
import StatusIndicatorContainer from './components/StatusIndicatorContainer';
import EditTodoButton from './components/EditTodoButton';
import SnoozeTodoButton from './components/SnoozeTodoButton';
import usePostpone from './hooks/usePostpone';
import TodoActionButtonWrapper from 'primitives/todoActionButtons/TodoActionButtonWrapper';
import Container from './components/Container';
import Checkbox from './components/Checkbox';
import { Value } from './components/Value';
import { QuickfixIcon, WaitingIcon } from './components/StatusIndicator';

type Props = {
    item: ItemModel;
    current: boolean;
    index: number;
};

const TodoListItem: React.FC<Props> = ({ item, current, index }) => {
    const { isEditing, stopEdit, startEdit, isSorting } = useTodoContext();

    const { dragPreviewRef, isDragging } = useDragAndDrop(
        isEditing,
        index,
        item,
    );

    const { onClick } = useToggleCurrentOnClick(item);

    const { onDoubleClick } = useStartEditOnDoubleClick(item);

    const { onDoneChanged } = useHandleDoneStatusChange(item);

    useScrollIntoView(dragPreviewRef, current);

    useStartEditingOnKeyDown(current);

    const { onTomorrowClick, onNextWeekClick } = usePostpone(item, current);

    const waiting = isWaiting(item);
    const showStatusIcon = !item.done && !isDragging;

    const { done, todo, total } = determineProgress(item);

    const heading = isHeading(item);

    const snoozingButtonsDisabled = isSnoozed(item) || heading || item.done;

    return (
        <Container
            item={item}
            current={current}
            isEditing={isEditing}
            ref={dragPreviewRef}
            isDragging={isDragging}
            isSorting={isSorting}
        >
            <>
                {/* @ts-ignore don't know how to fix ref */}
                <StatusIndicatorContainer>
                    {waiting && showStatusIcon && <WaitingIcon />}
                    {isQuickfix(item) && !waiting && showStatusIcon && (
                        <QuickfixIcon />
                    )}
                </StatusIndicatorContainer>
                {!heading && (
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
                {!isEditing && !isSorting && current && (
                    <TodoActionButtonWrapper>
                        <>
                            <SnoozeTodoButton
                                onClick={onTomorrowClick}
                                disabled={snoozingButtonsDisabled}
                            >
                                tomorrow
                            </SnoozeTodoButton>
                            <SnoozeTodoButton
                                onClick={onNextWeekClick}
                                disabled={snoozingButtonsDisabled}
                            >
                                next week
                            </SnoozeTodoButton>
                            <EditTodoButton onClick={() => startEdit()} />
                            <DeleteTodo item={item} />
                        </>
                    </TodoActionButtonWrapper>
                )}

                {!item.done && (
                    <ProgressBar done={done} todo={todo} total={total} />
                )}
                {hasNotes(item) && <HasNotesIndicator reverse={current} />}
            </>
        </Container>
    );
};

export default TodoListItem;
