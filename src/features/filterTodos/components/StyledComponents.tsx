import { DropdownButton } from 'react-bootstrap';
import styled from 'styled-components';

export const ButtonGroup = styled(DropdownButton)`
    .dropdown-toggle {
        background: ${({ theme }) => theme.colors.first} !important;
        border: none;
    }

    .dropdown-item {
        padding: 10px;
    }
`;

export const Button = styled.button<{ active: boolean }>`
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

export const Title = styled.div<{ active: boolean }>`
    flex: 1;
    color: ${({ active }) => active && `color: #333;`};
    text-align: left;
    padding-right: 10px;
`;

export const Badge = styled.div`
    width: 20px;
    color: white;
    background: rgba(0, 0, 0, 0.4);
    font-size: 0.7em;
    border-radius: 3px;
    padding: 3px 0;

    .dropdown-toggle & {
        display: inline-block;
        margin: 0 10px 0 10px;
    }
`;

export const FilterContainer = styled.div`
    margin-right: 10px;
    margin-top: 0;

    ${Button} {
        margin-top: 5px;
    }
`;
