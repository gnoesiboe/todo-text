import styled from 'styled-components';

export const ButtonWrapper = styled.div`
    margin-bottom: 20px;
`;

export const ExplanationContainer = styled.div`
    background: #2a9d8f;
    border-radius: 8px;
    padding: 40px;
    margin-bottom: 20px;

    p {
        color: white !important;
    }

    code,
    pre {
        color: #e9c46a !important;
        font-size: 1.1em;
    }

    .table {
        margin: -0.3rem !important;
    }
`;

export const ExplanationSection = styled.section`
    margin-bottom: 30px;
`;

export const ExplanationSectionTitle = styled.h3`
    color: #e9c46a !important;
`;

export const ExplanationOutput = styled.div`
    background: rgba(255, 255, 255, 0.7);
    padding: 20px;
    border-radius: 6px;
`;
