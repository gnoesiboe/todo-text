import React from 'react';
import { TodoListItem as ItemModel, ParsedTodoValue } from 'model/TodoListItem';
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
import ProgressBar from 'primitives/ProgressBar/ProgressBar';
import StatusIndicatorContainer from './components/StatusIndicatorContainer';
import EditTodoButton from './components/EditTodoButton';
import SnoozeTodoButton from './components/SnoozeTodoButton';
import usePostpone from './hooks/usePostpone';
import TodoActionButtonWrapper from 'primitives/todoActionButtons/TodoActionButtonWrapper';
import Container from './components/Container';
import Checkbox from './components/Checkbox';
import { Value } from './components/Value';
import { QuickfixIcon, WaitingIcon } from './components/StatusIndicator';
import AddTodo, { ButtonType } from 'features/addTodo/AddTodo';
import useToggleSubItemCheckedStatusOnClick from './hooks/useToggleSubItemCheckedStatusOnClick';
import AppearAndDisappearAnimationContainer from '../../primitives/animation/AppearAndDisappearAnimationContainer';

type Props = {
    item: ItemModel<ParsedTodoValue>;
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

    useToggleSubItemCheckedStatusOnClick(dragPreviewRef, item);

    const { onTomorrowClick, onNextWeekClick } = usePostpone();

    const showStatusIcon = !item.done && !isDragging;

    const snoozingButtonsDisabled =
        item.value.isSnoozed || item.value.isHeading || item.done;

    return (
        <Container
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            item={item}
            current={current}
            isEditing={isEditing}
            ref={dragPreviewRef}
            isDragging={isDragging}
            isSorting={isSorting}
        >
            {/* @ts-ignore don't know how to fix ref */}
            <StatusIndicatorContainer>
                {item.value.isWaiting && showStatusIcon && <WaitingIcon />}
                {item.value.isQuickfix &&
                    !item.value.isWaiting &&
                    showStatusIcon && <QuickfixIcon />}
            </StatusIndicatorContainer>
            {!item.value.isHeading && (
                <Checkbox
                    item={item}
                    isDragging={isDragging}
                    accented={item.value.isMust}
                    checked={item.done}
                    muted={item.done}
                    onChange={onDoneChanged}
                    disabled={!item.value.isActionable}
                />
            )}

            {current && isEditing ? (
                <EditTodo item={item} onCancel={() => stopEdit()} />
            ) : (
                <Value
                    item={item}
                    isDragging={isDragging}
                    onDoubleClick={onDoubleClick}
                    onClick={onClick}
                    dangerouslySetInnerHTML={{
                        __html: prepareForVisibility(item),
                    }}
                    isSorting={isSorting}
                    current={current}
                />
            )}
            {!isEditing && !isSorting && current && (
                <TodoActionButtonWrapper>
                    <AppearAndDisappearAnimationContainer>
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
                        <AddTodo buttonType={ButtonType.TodoAction} />
                        <DeleteTodo item={item} />
                    </AppearAndDisappearAnimationContainer>
                </TodoActionButtonWrapper>
            )}

            {!item.done && <ProgressBar {...item.value.progress} />}
            {item.value.notes.length > 0 && !isSorting && (
                <HasNotesIndicator reverse={current} />
            )}
        </Container>
    );
};

export default TodoListItem;
