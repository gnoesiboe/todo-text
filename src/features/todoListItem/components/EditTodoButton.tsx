import React from 'react';
import { EditTodoButtonBase } from './StyledComponents';

type Props = {
    onClick: () => void;
};

const EditTodoButton: React.FC<Props> = ({ onClick }) => (
    <EditTodoButtonBase onClick={onClick}>edit</EditTodoButtonBase>
);

export default EditTodoButton;
