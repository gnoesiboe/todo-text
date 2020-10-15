import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 50px;
    border: 1px solid black;
    height: 10px;
    position: absolute;
    right: -100px;
    top: 10px;
    opacity: 0.5;
`;

export const Bar = styled.div<{ percentage: number }>`
    background: green;
    width: ${({ percentage }) => percentage}%;
    height: 100%;
`;
