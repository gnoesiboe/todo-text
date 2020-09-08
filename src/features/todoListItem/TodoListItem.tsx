import React from 'react';
import {
    TodoListItem as ItemModel,
    isCancelled,
    isHeading,
    isMust,
} from '../../model/TodoListItem';
import EditTodo from '../editTodo/EditTodo';
import './TodoListItem.css';
import { prepareForVisibility } from './utility/visibilityUtilities';
import createClassName from 'classnames';
import useSwitchToEditModeOnSwitch from './hooks/useSwitchToEditModeOnClick';
import useHandleDoneStatusChange from './hooks/useHandleDoneStatusChange';
import Checkbox from '../../primitives/Checkbox/Checkbox';

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

    const className = createClassName('todo-list-item', {
        'todo-list-item--done': item.done,
        'todo-list-item--cancelled': isCancelled(item),
        'todo-list-item--is-being-edited': current,
        'todo-list-item--must': isMust(item),
    });

    return (
        <div className={className}>
            <>
                {!isCancelled(item) && !isHeading(item) && (
                    <Checkbox
                        checked={item.done}
                        onChange={onDoneChanged}
                        className="todo-list-item__checkbox"
                    />
                )}
                {current ? (
                    <EditTodo item={item} />
                ) : (
                    <div
                        className="todo-list-item__value"
                        onClick={onClick}
                        dangerouslySetInnerHTML={{
                            __html: prepareForVisibility(item),
                        }}
                    />
                )}
            </>
        </div>
    );
};

export default TodoListItem;
