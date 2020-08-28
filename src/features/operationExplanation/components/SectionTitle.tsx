import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const SectionTitle: React.FC<Props> = ({ children }) => (
    <h3 className="operation-explanation__section-title">{children}</h3>
);

export default SectionTitle;
