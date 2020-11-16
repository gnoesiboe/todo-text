import React from 'react';
import { editCurrentItem } from '../../../constants/keyDefnitions';
import { EditTodoButtonBase } from './StyledComponents';

type Props = {
    onClick: () => void;
};

const EditTodoButton: React.FC<Props> = ({ onClick }) => (
    <EditTodoButtonBase
        onClick={onClick}
        title={`Edit selected item (keyboard shortcut: ${editCurrentItem.description})`}
    >
        edit
    </EditTodoButtonBase>
);

export default EditTodoButton;
