import React from 'react';
import {
    TodoListItem as ItemModel,
    Mode,
    isCancelled,
    isHeading,
    isBeingEdited,
} from '../../model/TodoListItem';
import EditTodo from '../editTodo/EditTodo';
import './TodoListItem.css';
import { prepareForVisibility } from './utility/visibilityUtilities';
import createClassName from 'classnames';
import useSwitchToEditModeOnSwitch from './hooks/useSwitchToEditModeOnClick';
import useHandleDoneStatusChange from './hooks/useHandleDoneStatusChange';

export type OnChangeHandler = (
    id: string,
    value: string,
    done: boolean,
) => void;

export type OnDeleteHandler = (id: string) => void;

export type OnModeChangeHandler = (id: string, mode: Mode) => void;

type Props = {
    item: ItemModel;
};

const TodoListItem: React.FC<Props> = ({ item }) => {
    const { onClick } = useSwitchToEditModeOnSwitch(item);

    const { onDoneChanged } = useHandleDoneStatusChange(item);

    const className = createClassName('todo-list-item', {
        'todo-list-item--done': item.done,
        'todo-list-item--cancelled': isCancelled(item),
        'todo-list-item--is-being-edited': isBeingEdited(item),
    });

    return (
        <div className={className}>
            <>
                {!isCancelled(item) && !isHeading(item) && (
                    <input
                        className="todo-list-item__status-checkbox"
                        type="checkbox"
                        checked={item.done}
                        onChange={onDoneChanged}
                    />
                )}
                {item.mode === Mode.Edit && <EditTodo item={item} />}
                {item.mode === Mode.View && (
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
