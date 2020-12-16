import {
    parseISO,
    format,
    addDays,
    isAfter,
    startOfDay,
    startOfToday,
    isBefore,
    isSameDay,
    isMonday,
    addWeeks,
} from 'date-fns';

export const checkItIsCurrentlyEvening = () => {
    const currentHour = new Date().getHours();

    return currentHour > 18;
};

const isValidDate = (date: Date): boolean => date.toString() !== 'Invalid Date';

export const isExactDate = (value: string): boolean => !!parseDate(value);

export const parseDate = (value: string): Date | null => {
    const date = parseISO(value);

    return isValidDate(date) ? date : null;
};

const supportedInexactDateIndicators = [
    'today',
    'tomorrow',
    'next week',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
];

const dateFormat = 'yyyy-MM-dd';

export const transformInexactToExactDate = (value: string): string => {
    if (!supportedInexactDateIndicators.includes(value)) {
        console.warn('Incorrect, inexact value supplied:', value);

        return value;
    }

    if (value === 'today') {
        return format(new Date(), dateFormat);
    }

    if (value === 'tomorrow') {
        return format(addDays(new Date(), 1), dateFormat);
    }

    if (value === 'next week') {
        if (isMonday(new Date())) {
            return format(addWeeks(new Date(), 1), dateFormat);
        } else {
            // script below can take care of monday
            value = 'monday';
        }
    }

    const normalizedValue = value.toLowerCase();

    let cursor = new Date();

    while (format(cursor, 'EEEE').toLowerCase() !== normalizedValue) {
        cursor = addDays(cursor, 1);
    }

    return format(cursor, 'yyyy-MM-dd');
};

export const isAfterToday = (date: Date): boolean =>
    isAfter(startOfDay(date), startOfToday());

export const isBeforeToday = (date: Date): boolean =>
    isBefore(date, startOfToday());

export const isToday = (date: Date): boolean => isSameDay(date, new Date());
