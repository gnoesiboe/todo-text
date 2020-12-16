import styled from 'styled-components';

const Badge = styled.div`
    width: 20px;
    color: white;
    background: rgba(0, 0, 0, 0.4);
    font-size: 0.7em;
    border-radius: 3px;
    padding: 3px 0;

    .dropdown-toggle & {
        display: inline-block;
        margin: 0 10px 0 10px;
    }
`;

export default Badge;
