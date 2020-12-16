import styled from 'styled-components';

const Wrapper = styled.div`
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

export default Wrapper;
