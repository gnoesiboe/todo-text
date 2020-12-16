import styled from 'styled-components';

export const containerPaddingRightLeft = 20;

const Container = styled.div`
    border: 3px solid ${({ theme }) => theme.colors.first};
    padding: 30px ${containerPaddingRightLeft * 2}px 40px;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 30px;
    margin-right: 30px;
    position: relative;

    @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
        margin-right: 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
        padding: 15px ${containerPaddingRightLeft}px 20px;
    }
`;

export default Container;
