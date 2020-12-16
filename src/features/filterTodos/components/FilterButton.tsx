import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import Badge from './Badge';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick: () => void;
    title: string;
    active: boolean;
    amount: number;
};

const Title = styled.div<{ active: boolean }>`
    flex: 1;
    color: ${({ active }) => active && `color: #333;`};
    text-align: left;
    padding-right: 10px;
`;

const Button = styled.button<{ active: boolean }>`
    background: transparent;
    border: none;
    color: ${({ active }) => (active ? '#333' : '#999')};
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const Input = styled.input`
    width: 30px;
    margin-top: 2px;
`;

const FilterButton: React.FC<Props> = ({ title, active, onClick, amount }) => (
    <Button active={active} onClick={onClick}>
        <Input type="checkbox" checked={active} onChange={() => {}} />
        <Title active={active}>{title}</Title>
        {amount > 0 && <Badge>{amount}</Badge>}
    </Button>
);

export default FilterButton;
