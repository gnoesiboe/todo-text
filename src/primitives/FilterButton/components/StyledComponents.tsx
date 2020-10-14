import styled from 'styled-components';

export const Button = styled.button<{ active: boolean }>`
    ${({ active }) => active && `border-color: #fff !important;`};

    border-radius: 2px;
    background: transparent;
    padding: 4px 10px;
    margin-left: 10px;
    margin-bottom: 5px;
    border: 1px solid ${({ theme }) => theme.colors.fourth};
    color: #fff;

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
