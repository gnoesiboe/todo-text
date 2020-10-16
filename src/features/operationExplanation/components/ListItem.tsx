import React, { ReactNode } from 'react';
import styled from 'styled-components/macro';

type Props = {
    code: string;
    children: ReactNode;
};

const LI = styled.li`
    margin-bottom: 30px;
`;

const ListItem: React.FC<Props> = ({ code, children }) => (
    <LI>
        <pre>{code}</pre>
        {children}
    </LI>
);

export default ListItem;
