import styled, { css } from 'styled-components/macro';
import { QuestionIcon, AlertIcon } from '@primer/octicons-react';

const StatusIndicatorIconStyling = css`
    margin-right: 5px;
    display: inline;
`;

export const WaitingIcon = styled(QuestionIcon)`
    ${StatusIndicatorIconStyling}
    color: ${({ theme }) => theme.colors.fourth};
`;

export const QuickfixIcon = styled(AlertIcon)`
    ${StatusIndicatorIconStyling}
    color: ${({ theme }) => theme.colors.success};
`;
