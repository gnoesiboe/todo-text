import { splitAtLineBreak } from '../../../utility/stringUtilities';
import { TodoListItem } from './../../../model/TodoListItem';

export const determineProgress = (item: TodoListItem) => {
    const lines = splitAtLineBreak(item.value);

    let done = 0;
    let todo = 0;
    let total = 0;

    lines.forEach((line) => {
        const match = line.match(/^[*-]{1,1} \[([ x]{1,1})\]/);

        if (!match) {
            return;
        }

        const value = match[1] || null;

        if (value === null) {
            return;
        }

        if (value.trim() === 'x') {
            done++;
        } else {
            todo++;
        }
        total++;
    });

    return { done, todo, total };
};
