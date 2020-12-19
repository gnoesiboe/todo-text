import MarkdownIt from 'markdown-it';
import taskListsPlugin from 'markdown-it-task-checkbox';
import codeHighlighter from 'highlight.js';
import 'highlight.js/styles/tomorrow.css';

let instance: MarkdownIt;

function getInstance() {
    if (instance) {
        return instance;
    }

    instance = new MarkdownIt({
        highlight: function (str: string, lang: string) {
            if (lang && codeHighlighter.getLanguage(lang)) {
                try {
                    return codeHighlighter.highlight(lang, str).value;
                } catch (error) {
                    console.log('could not highlight value', error);
                }
            }

            return ''; // use external default escaping
        },
    });
    instance.use(taskListsPlugin);

    return instance;
}

export function parseMarkdown(markdown: string) {
    const instance = getInstance();

    return instance.render(markdown, {
        breaks: true,
        linkify: true,
    });
}
