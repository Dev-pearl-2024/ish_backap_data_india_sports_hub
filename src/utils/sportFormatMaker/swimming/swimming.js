export const SwimmingFormat = (inputData) => {
    const timeToSeconds = (timeStr) => {
        const [hh, mm, ss] = timeStr.split(":").map(parseFloat);
        return hh * 3600 + mm * 60 + ss;
    }
    const result = inputData.slice(1)?.map(([position, nameArr, country, time, , note]) => ({
        id: position,
        name: nameArr?.[1]?.trim(),
        country,
        time,
        timeInSeconds: time && timeToSeconds(time),
        note: note || '',
        flag: nameArr?.[0]?.trim()
    }));
    return result
}