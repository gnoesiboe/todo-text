import styled from 'styled-components';

const TodoActionButtonWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: -22px;
    padding-left: 40px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;

    @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
        padding-left: 0;
        justify-content: center;
        gap: 8px;
    }
`;

export default TodoActionButtonWrapper;
