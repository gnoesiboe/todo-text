import React, { MouseEventHandler } from 'react';
import { editCurrentItem } from 'constants/keyDefnitions';
import TodoActionButton from 'primitives/todoActionButtons/TodoActionButton';

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const EditTodoButton: React.FC<Props> = ({ onClick }) => (
    <TodoActionButton
        onClick={onClick}
        title={`Edit selected item (keyboard shortcut: ${editCurrentItem.description})`}
    >
        edit
    </TodoActionButton>
);

export default EditTodoButton;
