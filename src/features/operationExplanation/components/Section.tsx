import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const Section: React.FC<Props> = ({ children }) => (
    <section className="operation-explanation__section">{children}</section>
);

export default Section;
