
function formatTimeDifference(difference) {
    let timeString = "";

    // Only include "days" if it's greater than 0
    if (difference.days > 0) {
        timeString += `${difference.days} day${difference.days > 1 ?'s':''} ago`;
    }

    // Include hours and ensure there's a separator if both days and hours are present
    // if (difference.hours > 0 || difference.days > 0) {
    //     // if (timeString) {
    //     //     timeString += ``;
    //     // }
    //     timeString += `${difference.hours} hour${difference.hours > 1 ? 's' : ''}`;
    // }

    return timeString;
}

function getTimeDifference(targetDateString) {
    const targetDate = new Date(targetDateString);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    let diffInMilliseconds = targetDate - currentDate;

    // If the target date is in the past, reverse the order to avoid negative values
    const isPast = diffInMilliseconds < 0;
    if (isPast) {
        diffInMilliseconds = Math.abs(diffInMilliseconds);
    }

    // Convert milliseconds to days, hours, minutes, and seconds
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    diffInMilliseconds %= (1000 * 60 * 60 * 24);

    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    diffInMilliseconds %= (1000 * 60 * 60);

    const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
    diffInMilliseconds %= (1000 * 60);

    const seconds = Math.floor(diffInMilliseconds / 1000);

    return formatTimeDifference({
        isPast,
        days,
        hours,
        minutes,
        seconds
    });
}


export default getTimeDifference;
