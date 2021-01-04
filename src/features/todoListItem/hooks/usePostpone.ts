import { MouseEventHandler } from 'react';
import { useTodoContext } from 'context/todoContext/TodoContext';

export default function usePostpone() {
    const { snoozeCurrentItemUntil } = useTodoContext();

    const onTomorrowClick: MouseEventHandler<HTMLButtonElement> = () =>
        snoozeCurrentItemUntil('tomorrow');

    const onNextWeekClick: MouseEventHandler<HTMLButtonElement> = () =>
        snoozeCurrentItemUntil('next week');

    return { onTomorrowClick, onNextWeekClick };
}
