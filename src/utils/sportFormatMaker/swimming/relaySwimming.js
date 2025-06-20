function convertTimeToSeconds(timeStr) {
    const parts = timeStr?.split(':');
    const hours = parseInt(parts?.[0]);
    const minutes = parseInt(parts?.[1]);
    const [seconds, millis] = parts?.[2]?.split('.')?.map(Number);
    return (hours * 3600) + (minutes * 60) + seconds + millis / 100;
}


export const RelaySwimming = (inputData) => {
    return inputData.slice(1).map((row, index) => {
        const time = row?.[3]?.replace('00:', '');
        const timeInSeconds = row?.[3] && convertTimeToSeconds(row?.[3]);
        const country = row?.[2]?.[0];
        console.log("this is runing or not we don't know",{
            id: index + 1,
            athletes: row?.[1]?.map((name, i) => ({
                name: name?.trim(),
                country: row?.[2]?.[i]
            })),
            time: time,
            timeInSeconds,
            note: row[5] || '-',
            flag: ''
        })
        return {
            id: index + 1,
            athletes: row?.[1]?.map((name, i) => ({
                name: name?.trim(),
                country: row?.[2]?.[i]
            })),
            time: time,
            timeInSeconds,
            note: row[5] || '-',
            flag: ''
        };
    });
}
