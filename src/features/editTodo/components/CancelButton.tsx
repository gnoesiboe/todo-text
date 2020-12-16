import styled from 'styled-components/macro';
import { Button } from 'react-bootstrap';

const CancelButton = styled(Button)`
    color: ${({ theme }) => theme.colors.first};

    & :hover {
        color: #000;
    }
`;

export default CancelButton;
