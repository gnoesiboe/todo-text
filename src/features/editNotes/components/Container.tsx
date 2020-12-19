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
    position: relative;

    * {
        color: rgba(0, 0, 0, 0.7);
        font-family: monospace;
    }

    ul {
        padding-left: 25px;
    }

    .task-list {
        padding: 0;
        list-style: none;
        border-left: 1px solid #000;
        margin-left: 10px;

        // indented task lists
        .task-list {
            margin-left: 30px;
        }
    }

    .task-list-item {
        margin-left: -7px;
        padding: 3px 0;

        label {
            margin: 0;
        }
    }

    .task-list-item input[type='checkbox'] {
        margin-right: 10px;
        opacity: 1;
    }

    .task-list-item input[type='checkbox']:checked + label {
        text-decoration: line-through;
        opacity: 0.2;
    }

    h1,
    h2,
    h3 {
        color: #000;
        margin-top: 30px;
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
        margin: 50px 0;
    }

    pre {
        border: 1px solid rgba(0, 0, 0, 0.2);
        background: rgba(255, 255, 255, 0.3);
        margin: 20px 0;
        border-radius: 5px;
        padding: 13px;
    }
`;
