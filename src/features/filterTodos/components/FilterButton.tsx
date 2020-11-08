import React, { ButtonHTMLAttributes } from 'react';
import { Button, Input, Title, Badge } from './StyledComponents';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick: () => void;
    title: string;
    active: boolean;
    amount: number;
};

const FilterButton: React.FC<Props> = ({ title, active, onClick, amount }) => (
    <Button active={active} onClick={onClick}>
        <Input type="checkbox" checked={active} onChange={() => {}} />
        <Title active={active}>{title}</Title>
        {amount > 0 && <Badge>{amount}</Badge>}
    </Button>
);

export default FilterButton;
