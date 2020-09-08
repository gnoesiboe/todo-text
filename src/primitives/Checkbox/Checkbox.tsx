import React from 'react';
import createClassName from 'classnames';
import './Checkbox.css';

type Props = {
    checked: boolean;
    className?: string;
    onChange: () => void;
};

const Checkbox: React.FC<Props> = ({
    checked,
    className: additionalClassName,
    onChange,
}) => {
    const className = createClassName(
        'checkbox__replacement',
        additionalClassName,
    );

    return (
        <span className="checkbox__container">
            <input
                type="checkbox"
                checked={checked}
                className="checkbox__original"
                onChange={() => onChange()}
            />
            <span className={className} onClick={() => onChange()} />
        </span>
    );
};

export default Checkbox;
