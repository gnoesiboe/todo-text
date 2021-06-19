import styled from 'styled-components/macro';
import ReactTextareaAutosize from 'react-autosize-textarea';

const Textarea = styled(ReactTextareaAutosize)`
    padding: 8px;
    margin: 0;
    width: 100%;
    background: initial;
    font-size: 18px !important;
    font-family: Arial, Helvetica, sans-serif !important;
    resize: none;
    border: none;
`;

export default Textarea;
