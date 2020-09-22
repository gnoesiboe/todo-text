import styled from 'styled-components';

export const Container = styled.div`
    border: 3px solid #264653;
    padding: 40px;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 30px;
`;

export const ConnectionIndicator = styled.div`
    float: right;
    color: #aaa;
    margin-top: 20px;
`;

export const FilterButton = styled.button<{ active: boolean }>`
    ${({ active, theme }) =>
        active
            ? `border: 1px solid ${theme.colors.first};`
            : `border: 1px dashed #ddd;`};

    background: transparent;
    padding: 4px 10px;
    margin-right: 10px;

    &:before {
        content: ' ';
    }
`;
