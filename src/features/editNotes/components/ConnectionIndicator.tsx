import { DatabaseIcon, SyncIcon } from '@primer/octicons-react';
import styled, { css } from 'styled-components';
import rotate from '../../../primitives/keyframes/rotate';
import wobble from '../../../primitives/keyframes/wobble';

// @todo combine with connection indicators in TodoList/StyledComponents (as they are more or less the same)

const connectionIndicatorCss = css`
    position: absolute;
    top: 10px;
    right: 10px;
`;

export const FetchingIndicator = styled(SyncIcon)`
    ${connectionIndicatorCss}
    animation: ${rotate} 2s linear infinite;
`;

export const SavingIndicator = styled(DatabaseIcon)`
    ${connectionIndicatorCss}
    animation: ${wobble} 2s linear infinite;
`;
