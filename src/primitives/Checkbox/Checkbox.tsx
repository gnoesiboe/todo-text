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
    disabled?: boolean;
    onChange: () => void;
};

const Checkbox: React.FC<Props> = ({
    checked,
    onChange,
    className,
    accented = false,
    muted = false,
    disabled = false,
}) => (
    <Container className={className}>
        <Input
            disabled={disabled}
            type="checkbox"
            checked={checked}
            onChange={() => onChange()}
        />
        <CheckboxReplacement
            onClick={() => !disabled && onChange()}
            disabled={disabled}
            accented={accented}
            muted={muted}
        />
    </Container>
);

export default Checkbox;
