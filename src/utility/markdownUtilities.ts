import MarkdownIt from 'markdown-it';
import taskListsPlugin from 'markdown-it-task-checkbox';

let instance: MarkdownIt;

function getInstance() {
    if (instance) {
        return instance;
    }

    instance = new MarkdownIt();
    instance.use(taskListsPlugin);

    return instance;
}

export function parseMarkdown(markdown: string) {
    return getInstance().render(markdown, {
        breaks: true,
        linkify: true,
    });
}
