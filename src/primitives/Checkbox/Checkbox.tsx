import React from 'react';
import {
    Input,
    CheckboxReplacement,
    Container,
} from './components/StyledComponents';

type Props = {
    checked: boolean;
    accented?: boolean;
    muted?: boolean;
    className?: string;
    onChange: () => void;
};

const Checkbox: React.FC<Props> = ({
    checked,
    onChange,
    className,
    accented = false,
    muted = false,
}) => (
    <Container className={className}>
        <Input type="checkbox" checked={checked} onChange={() => onChange()} />
        <CheckboxReplacement
            onClick={() => onChange()}
            accented={accented}
            muted={muted}
        />
    </Container>
);

export default Checkbox;
