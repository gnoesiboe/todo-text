import styled from 'styled-components/macro';

const ExplanationContainer = styled.div`
    background: ${({ theme }) => theme.colors.second};
    border-radius: 8px;
    padding: 40px;
    margin-bottom: 20px;

    p {
        color: white !important;
    }

    code,
    pre {
        color: ${({ theme }) => theme.colors.third} !important;
        font-size: 1.1em;
    }

    .table {
        margin: -0.3rem !important;
    }
`;

export default ExplanationContainer;
