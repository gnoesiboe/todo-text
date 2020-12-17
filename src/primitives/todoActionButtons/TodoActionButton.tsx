import styled from 'styled-components';

const TodoActionButton = styled.button`
    border: none;
    background: none;
    padding: 3px 5px;
    color: #999;
    border-radius: 2px;
    font-size: 0.8em;

    &:hover {
        border-color: #000;
        color: #000;
    }

    &[disabled] {
        color: #ddd;
        cursor: not-allowed;
    }
`;

export default TodoActionButton;
