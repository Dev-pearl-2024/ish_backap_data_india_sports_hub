export function calculateRemainingTime(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);

    // Calculate the total months difference
    let months = (target.getFullYear() - now.getFullYear()) * 12;
    months -= now.getMonth();
    months += target.getMonth();

    // If target date is less than the current day of the month, subtract one month
    if (target.getDate() < now.getDate()) {
        months--;
    }

    // Calculate the days remaining after the month calculation
    let days;
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    if (target.getDate() >= now.getDate()) {
        days = target.getDate() - now.getDate();
    } else {
        days = (endOfMonth - now.getDate()) + target.getDate();
    }

    return {months:months,days:days};
}
