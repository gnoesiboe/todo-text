import styled from 'styled-components';

import { Container } from '../../todoListItem/components/StyledComponents';

export const Button = styled.button`
    padding: 2px;
    border-radius: 4px;
    margin: 0;
    border: none;
    background: #fff;
    position: absolute;
    right: 3px;
    top: 3px;
    display: none;
    border: 1px solid #ddd;
    transition: 1s;

    &:hover {
        background: #ddd;
        border-color: #333;
    }

    ${Container}:hover & {
        display: inline;
    }
`;
