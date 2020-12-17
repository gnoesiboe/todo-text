import styled from 'styled-components';

const TodoActionButton = styled.button`
    border: none;
    background: none;
    padding: 3px 5px;
    color: #999;
    border-radius: 2px;
    font-size: 0.8em;
    margin-right: 5px;

    &:hover {
        border-color: #000;
        color: #000;
    }

    &[disabled] {
        color: #ddd;
        cursor: not-allowed;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
        display: block;
        margin-right: 0;
    }
`;

export default TodoActionButton;
