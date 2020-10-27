import styled from 'styled-components/macro';

export const ButtonWrapper = styled.div`
    margin-bottom: 20px;
`;

export const ExplanationContainer = styled.div`
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

export const ExplanationSection = styled.section`
    margin-bottom: 30px;
`;

export const ExplanationSectionTitle = styled.h3`
    color: ${({ theme }) => theme.colors.third} !important;
`;

export const ExplanationOutput = styled.div`
    background: rgba(255, 255, 255, 0.7);
    padding: 20px;
    border-radius: 6px;
`;
