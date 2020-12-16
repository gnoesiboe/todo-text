import styled from 'styled-components';

const Bar = styled.div<{ percentage: number }>`
    background: green;
    width: ${({ percentage }) => percentage}%;
    transition: width 1s;
    height: 100%;
`;

export default Bar;
