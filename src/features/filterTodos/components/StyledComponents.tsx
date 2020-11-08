import { DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';

export const ButtonGroup = styled(DropdownButton)`
    .dropdown-toggle {
        background: ${({ theme }) => theme.colors.first} !important;
    }

    .dropdown-item {
        padding-left: 10px;
    }
`;

export const Button = styled.button<{ active: boolean }>`
    background: transparent;
    border: none;
    color: ${({ active }) => (active ? '#333' : '#888')};
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const Input = styled.input`
    width: 30px;
    margin-top: 2px;
`;

export const Title = styled.div<{ active: boolean }>`
    flex: 1;
    color: ${({ active }) => active && `color: #333;`};
    text-align: left;
`;

export const Badge = styled.div`
    width: 20px;
    color: white;
    background: #999;
    font-size: 0.8em;
    border-radius: 3px;
    padding: 2px 0;
`;

export const FilterContainer = styled.div`
    margin-right: 10px;
    margin-top: 0;

    ${Button} {
        margin-top: 5px;
    }
`;
