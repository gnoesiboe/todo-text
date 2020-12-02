import React, { ButtonHTMLAttributes } from 'react';
import { SnoozeTodoButtonBase } from './StyledComponents';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const SnoozeTodoButton: React.FC<Props> = (props) => (
    <SnoozeTodoButtonBase {...props}>tomorrow</SnoozeTodoButtonBase>
);

export default SnoozeTodoButton;
