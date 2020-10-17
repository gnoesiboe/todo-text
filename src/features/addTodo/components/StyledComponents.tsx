import { PlusIcon } from '@primer/octicons-react';
import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 50%;
    border: none;
    padding: 10px;
    background: #fff;
    border: 1px solid #aaa;
    text-align: center;
    text-decoration: none;
    display: block;
    width: 40px;
    height: 40px;
    opacity: 0.8;
    transition: border-color 0.3s;
    transition: color 0.3s;
    color: #999;

    &:hover {
        border-color: ${({ theme }) => theme.colors.fourth};
        color: #333;
    }
`;

export const Icon = styled(PlusIcon)`
    height: 18px;
    width: 18px;
`;
