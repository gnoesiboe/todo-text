import React, { ButtonHTMLAttributes } from 'react';
import TodoActionButton from 'primitives/todoActionButtons/TodoActionButton';

type Props = Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'title'
> & {
    children: string;
};

const SnoozeTodoButton: React.FC<Props> = (props) => (
    <TodoActionButton
        {...props}
        title="Snooze your todo for the indicated time"
    />
);

export default SnoozeTodoButton;
