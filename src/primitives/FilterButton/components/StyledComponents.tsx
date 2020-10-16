import styled from 'styled-components/macro';

export const Button = styled.button<{ active: boolean }>`
    border-radius: 2px;
    background: transparent;
    padding: 4px 4px 4px 1px;
    margin-left: 10px;
    margin-bottom: 5px;
    border: none;
    color: ${({ active }) => (active ? '#333' : '#666')};

    &:before {
        content: ' ';
    }

    position: relative;
`;

export const Input = styled.input`
    position: absolute;
    left: 7px;
    top: 5px;
`;

export const Title = styled.div<{ active: boolean }>`
    margin-left: 28px;

    ${({ active }) => active && `color: #333;`};
`;
