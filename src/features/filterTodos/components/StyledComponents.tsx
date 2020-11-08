import { DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';

export const ButtonGroup = styled(DropdownButton)`
    .dropdown-toggle {
        background: ${({ theme }) => theme.colors.first} !important;
    }
`;

export const Button = styled.button<{ active: boolean }>`
    background: transparent;
    border: none;
    color: ${({ active }) => (active ? '#333' : '#888')};
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    position: relative;
`;

export const Input = styled.input`
    position: absolute;
    left: 7px;
    top: 5px;
`;

export const Title = styled.div<{ active: boolean }>`
    margin-left: 28px;

    ${({ active }) => active && `color: #333;`};
`;

export const FilterContainer = styled.div`
    margin-right: 10px;
    margin-top: 0;

    ${Button} {
        margin-top: 5px;
    }
`;
