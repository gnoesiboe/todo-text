import styled from 'styled-components';

const TodoActionButtonWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: -22px;
    padding-left: 40px;
    overflow: hidden;

    @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
        padding-left: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;

export default TodoActionButtonWrapper;
