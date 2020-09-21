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
} from './components/StyledComponents';
import DeleteTodo from '../deleteTodo/DeleteTodo';
import { DragObjectWithType } from 'react-dnd';
import useDragItem from './hooks/useDragItem';
import useDropItem from './hooks/useDropItem';

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
};

export interface DragObject extends DragObjectWithType {
    id: string;
    index: number; // remove if not needed
}

export const dragDropItemType = 'only';

const TodoListItem: React.FC<Props> = ({ item, current, index }) => {
    const ref = useRef<HTMLDivElement>(null);

    const { onClick } = useSwitchToEditModeOnSwitch(item);

    const { onDoneChanged } = useHandleDoneStatusChange(item);

    const { isDragging, applyDrag } = useDragItem(item, index);

    const { applyDrop } = useDropItem(ref, index);

    applyDrag(applyDrop(ref));

    return (
        <Container
            item={item}
            current={current}
            ref={ref}
            isDragging={isDragging}
        >
            <>
                {isWaiting(item) && !current && !item.done && (
                    <span title="Waiting..">
                        <WaitingIcon />
                    </span>
                )}
                {isQuickfix(item) && !current && !item.done && (
                    <span title="Quickfix">
                        <QuickfixIcon />
                    </span>
                )}
                {!isHeading(item) && (
                    <Checkbox
                        item={item}
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
