import React from 'react';
import {
    TodoListItem as ItemModel,
    isCancelled,
    isHeading,
    isMust,
} from '../../model/TodoListItem';
import EditTodo from '../editTodo/EditTodo';
import { prepareForVisibility } from './utility/visibilityUtilities';
import useSwitchToEditModeOnSwitch from './hooks/useSwitchToEditModeOnClick';
import useHandleDoneStatusChange from './hooks/useHandleDoneStatusChange';
import { Container, Checkbox, Value } from './components/StyledComponents';

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
};

const TodoListItem: React.FC<Props> = ({ item, current }) => {
    const { onClick } = useSwitchToEditModeOnSwitch(item);

    const { onDoneChanged } = useHandleDoneStatusChange(item);

    return (
        <Container item={item} current={current}>
            <>
                {!isCancelled(item) && !isHeading(item) && (
                    <Checkbox
                        item={item}
                        accented={isMust(item)}
                        checked={item.done}
                        muted={item.done}
                        onChange={onDoneChanged}
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
            </>
        </Container>
    );
};

export default TodoListItem;
