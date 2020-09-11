import styled from 'styled-components';

export const Container = styled.span``;

export const Input = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`;

export const CheckboxReplacement = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 14px;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 2px;

    &:hover {
        background-color: #ccc;
        border-color: #999;
    }

    &:after {
        content: '×';
        font-size: 26px;
        position: absolute;
        display: none;
        text-align: center;
        top: -14px;
        left: -2px;
    }

    ${Container}:checked & {
        background-color: #2196f3;
    }

    ${Input}:checked ~ &:after {
        display: block;
    }
`;
