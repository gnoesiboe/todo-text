import styled from 'styled-components/macro';

export const Button = styled.button<{ visible: boolean }>`
    position: absolute;
    right: 36px;
    bottom: -18px;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    color: #999;
    border-radius: 2px;
    font-size: 0.8em;

    &:hover {
        border-color: #000;
        color: #000;
    }
`;
