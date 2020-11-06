export const checkItIsCurrentlyEvening = () => {
    const currentHour = new Date().getHours();

    return currentHour > 18;
};
