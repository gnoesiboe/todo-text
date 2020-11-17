import styled from 'styled-components/macro';

export const Wrapper = styled.div`
    width: 40px;
    border: 1px solid black;
    height: 10px;
    position: absolute;
    right: -90px;
    top: 10px;
    opacity: 0.5;

    @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
        display: none;
    }
`;

export const Bar = styled.div<{ percentage: number }>`
    background: green;
    width: ${({ percentage }) => percentage}%;
    transition: width 1s;
    height: 100%;
`;
