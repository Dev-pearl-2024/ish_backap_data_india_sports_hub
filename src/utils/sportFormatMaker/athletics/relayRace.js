export const convertRelayData = (raw) => {
    const parseTimeToSeconds = (time) => {
        const parts = time.split('.');
        const seconds = parseFloat(parts[1] || '0');
        const main = parseFloat(parts[0]);
        return main + seconds / 100;
    };

    return raw
        .slice(1)
        .filter(row => Array.isArray(row[1]) && row[1].length > 0)
        .map((row, index) => {
            const rank = row?.[0];
            const names = row?.[1];
            const countries = row?.[3]
            const country = countries?.[0]
            const time = row?.[4]

            return {
                id: rank,
                athletes: names?.map(name => ({ name: name?.trim(), country })),
                time,
                timeInSeconds: parseFloat(parseTimeToSeconds(time)?.toFixed(2)),
                note: row?.[row?.length - 1],
                flag: '',
            };
        });
}