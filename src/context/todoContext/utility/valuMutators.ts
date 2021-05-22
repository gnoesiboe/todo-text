import { InexactDateInidicator } from '../../../utility/dateTimeUtilities';
import { splitAtLineBreak } from '../../../utility/stringUtilities';

export const applySnoozeItemUntilToValue = (
    value: string,
    until: InexactDateInidicator,
): string => {
    const [summaryLine, ...otherLines] = splitAtLineBreak(value);

    let augmentedSummaryLine: string;

    // if already snoozed, remove the current snoozed line first
    augmentedSummaryLine = summaryLine.replace(/@snoozeUntil\([^)]+\)/g, '');

    // add new snooze tag
    augmentedSummaryLine += ` @snoozeUntil(${until})`;

    return [augmentedSummaryLine, ...otherLines].join('\n');
};
