import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const ExplanationOutput: React.FC<Props> = ({ children }) => (
    <div className="operation-explanation__output">{children}</div>
);

export default ExplanationOutput;
