import styled from 'styled-components/macro';
import { Button } from 'react-bootstrap';

const SubmitButton = styled(Button)`
    background: ${({ theme }) => theme.colors.first};
    border: none;
`;

export default SubmitButton;
