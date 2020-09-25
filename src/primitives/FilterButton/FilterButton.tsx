import React, { ButtonHTMLAttributes } from 'react';
import { Button, Input, Title } from './components/StyledComponents';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick: () => void;
    title: string;
    active: boolean;
};

const FilterButton: React.FC<Props> = ({ title, active, onClick }) => {
    return (
        <Button active={active} onClick={onClick}>
            <Input type="checkbox" checked={active} onChange={() => {}} />
            <Title active={active}>{title}</Title>
        </Button>
    );
};

export default FilterButton;
