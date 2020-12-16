import React from 'react';
import CheckboxReplacement from './components/CheckboxReplacement';
import Input from './components/Input';

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
    <span className={className}>
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
    </span>
);

export default Checkbox;
