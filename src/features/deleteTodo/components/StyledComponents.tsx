import styled from 'styled-components';

export const Button = styled.button<{ visible: boolean }>`
    padding: 2px;
    border-radius: 4px;
    margin: 0;
    border: none;
    background: none;
    border: none;
    position: absolute;
    right: 3px;
    top: 0;
    display: ${({ visible }) => (visible ? `inline` : 'none')};
    transition: 1s;

    &:hover {
        background: #ddd;
        border-color: #333;
    }
`;
