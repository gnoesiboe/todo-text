import styled from 'styled-components/macro';
import { actionButtonBase } from '../../todoListItem/components/StyledComponents';

export const Button = styled.button<{ visible: boolean }>`
    ${actionButtonBase};
`;
