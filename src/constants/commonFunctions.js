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

export function stringToDarkColor(str) {
    // Generate a hash from the string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert the hash to a dark RGB color
    let color = '#';
    for (let i = 0; i < 3; i++) {
        // Get each RGB component value in the range 0-255
        let value = (hash >> (i * 8)) & 0xFF;
        // Ensure the color is dark by reducing the brightness (shift the value to be in the range 0-127)
        value = Math.floor(value / 2);
        // Convert to hexadecimal and ensure it's two digits
        color += ('00' + value.toString(16)).slice(-2);
    }

    return color;
}