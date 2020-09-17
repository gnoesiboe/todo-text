import styled from 'styled-components';
import { Container as TodoListItemContainer } from '../../todoListItem/components/StyledComponents';

export const Button = styled.button<{ isTouchDevice: boolean }>`
    padding: 2px;
    border-radius: 4px;
    margin: 0;
    border: none;
    background: #fff;
    position: absolute;
    right: -7px;
    top: -9px;
    display: ${({ isTouchDevice }) => (isTouchDevice ? 'inline' : 'none')};
    border: 1px solid #ddd;
    transition: 1s;

    &:hover {
        background: #ddd;
        border-color: #333;
    }

    ${TodoListItemContainer}:hover & {
        display: inline;
    }
`;
