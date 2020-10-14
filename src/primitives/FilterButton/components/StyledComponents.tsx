import styled from 'styled-components';

export const Button = styled.button<{ active: boolean }>`
    ${({ active, theme }) =>
        active && `border-color: ${theme.colors.first} !important;`};

    border-radius: 2px;
    background: transparent;
    padding: 4px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    color: #ddd;

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
    margin-left: 22px;

    ${({ active }) => active && `color: #333;`};
`;
