export const ConvertJavelinThrow = (data) => {
    return data.slice(2).map(row => {
        const name = row[1];
        const country = row[3];
        const throws = row.slice(4, 10).map(val => (val?.toLowerCase() != 'X'?.toLowerCase() ? val : null));
        const score = parseFloat(row[10]) || 0;
        let note = row[row.length - 1];
        const flagData = { code: country, flag: "" };

        return {
            rank: row?.[0],
            name,
            country: flagData.code,
            score,
            note,
            flagEmoji: flagData.flag,
            throws,
        };
    });
}