import styled from 'styled-components';
import { DropdownButton } from 'react-bootstrap';

const ButtonGroup = styled(DropdownButton)`
    .dropdown-toggle {
        background: ${({ theme }) => theme.colors.first} !important;
        border: none;
    }

    .dropdown-item {
        padding: 10px;
    }
`;

export default ButtonGroup;
