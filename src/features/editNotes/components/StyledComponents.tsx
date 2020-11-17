import styled, { css } from 'styled-components';

const sharedContainerStyle = css`
    border: 3px solid ${({ theme }) => theme.colors.first};
    padding: 20px;
    border-radius: 8px;
`;

export const EditorContainer = styled.div`
    ${sharedContainerStyle}
    background: rgba(255, 255, 255, 0.3);

    .ace-tomorrow {
        background: none;
        .ace_heading,
        .ace_markup.ace_heading,
        .ace_string {
            color: ${({ theme }) => theme.colors.fourth};
            font-weight: bold;
            border-bottom: 1px solid ${({ theme }) => theme.colors.fourth};
        }

        .ace_strong {
            color: #000;
        }
    }
`;

export const ViewContainer = styled.div`
    ${sharedContainerStyle}

    * {
        color: rgba(0, 0, 0, 0.7);
        font-family: monospace;
    }

    .task-list {
        padding: 0;
        list-style: none;

        .task-list {
            margin-left: 20px;
        }
    }

    .task-list-item input[type='checkbox'] {
        margin-right: 10px;
    }

    .task-list-item input[type='checkbox']:checked + label {
        text-decoration: line-through;
        opacity: 0.2;
    }

    h1,
    h2,
    h3 {
        color: #000;
    }

    h1 {
        font-size: 1.3em;
    }

    h2 {
        font-size: 1.1em;
    }

    h1:first-child {
        margin-top: 0;
    }

    a {
        color: #000;
        text-decoration: underline;
    }

    hr {
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin: 30px 0;
    }
`;
