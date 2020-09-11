import React from 'react';
import {
    Input,
    CheckboxReplacement,
    Container,
} from './components/StyledComponents';

type Props = {
    checked: boolean;
    className?: string;
    onChange: () => void;
};

const Checkbox: React.FC<Props> = ({ checked, onChange }) => (
    <Container>
        <Input type="checkbox" checked={checked} onChange={() => onChange()} />
        <CheckboxReplacement onClick={() => onChange()} />
    </Container>
);

export default Checkbox;
