import React from 'react';
import styled from 'styled-components';
import { valueMarginLeft } from './Value';

type Props = {
    children: React.ReactNode;
};

const Wrapper = styled.div`
    position: absolute;
    left: calc(-${valueMarginLeft} - 20px);
    top: 5px;
    z-index: ${({ theme }) => theme.zIndex.statusIndicatorContainerWrapper};

    @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
        display: none;
    }
`;

const StatusIndicatorContainer: React.FC<Props> = ({ children }) => {
    if (React.Children.count(children) === 0) {
        return null;
    }

    return <Wrapper>{children}</Wrapper>;
};

export default StatusIndicatorContainer;
