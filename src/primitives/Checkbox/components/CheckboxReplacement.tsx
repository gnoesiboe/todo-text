import styled from 'styled-components/macro';
import Input from './Input';

const CheckboxReplacement = styled.span<{
    accented: boolean;
    muted: boolean;
    disabled: boolean;
}>`
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 14px;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 2px;

    ${({ accented, disabled }) =>
        accented && !disabled && `border: 3px solid #000;`}

    ${({ muted }) =>
        muted &&
        `
            opacity: 0.5;
            background: #fff;
            color: #999;
            border: 1px solid #ccc !important;
        `}

    ${({ disabled }) => disabled && `cursor: not-allowed; opacity: 0.7;`}

    &:hover {
        &:not([disabled]) {
            border-color: #999;
        }
    }

    &:after {
        content: '×';
        font-size: 26px;
        position: absolute;
        display: none;
        text-align: center;
        top: -14px;
        left: -1px;

        ${({ muted }) => muted && `color: #bbb;`}

        ${({ disabled }) =>
            disabled &&
            `
                content: '˜';
                display: initial;
                top: -5px;
                left: 0;
                color: #bbb;
            `}
    }

    ${Input}:checked ~ &:after {
        display: block;
    }
`;

export default CheckboxReplacement;
