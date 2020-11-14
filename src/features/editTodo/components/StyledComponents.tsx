import styled from 'styled-components/macro';
import ReactTextareaAutosize from 'react-autosize-textarea';
import { Button } from 'react-bootstrap';

export const Form = styled.form`
    margin-left: 37px;
`;

export const TextareaAutosize = styled(ReactTextareaAutosize)`
    border: none;
    padding: 15px;
    margin: 0;
    width: 100%;
    background: initial;
    font-size: 18px !important;
    font-family: Arial, Helvetica, sans-serif !important;
    resize: none;
`;

export const SubmitButton = styled(Button)`
    background: ${({ theme }) => theme.colors.first};
    border: none;
`;

export const CancelButton = styled(Button)`
    color: ${({ theme }) => theme.colors.first};

    & :hover {
        color: #000;
    }
`;
