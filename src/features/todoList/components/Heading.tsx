import styled from 'styled-components/macro';

const Heading = styled.h1`
    border-radius: 4px;
    padding: 0 5px 0 0;
    margin: 0;
    font-weight: bold;
    color: #fff;
    background: ${({ theme }) => theme.colors.fourth};

    &::first-letter {
        background: ${({ theme }) => theme.colors.first};
        padding: 0 10px 0 7px;
        margin-right: 3px;
    }
`;

export default Heading;
