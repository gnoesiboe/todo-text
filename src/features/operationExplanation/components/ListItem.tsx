import React, { ReactNode } from 'react';

type Props = {
    code: string;
    children: ReactNode;
};

const ListItem: React.FC<Props> = ({ code, children }) => (
    <li className="explanation-explanantion__list-item">
        <pre>{code}</pre>
        {children}
    </li>
);

export default ListItem;
