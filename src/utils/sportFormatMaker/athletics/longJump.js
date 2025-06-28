export const ConvertLongJump = (rawData) => {
    const formattedData = rawData.slice(2).map((row, index) => {
        const name = row[1];
        const country = row[3];
        const attempts = row.slice(4, -1);
        const bestJump = row[row.length - 2];
        const note = row[row.length - 1];
        return {
            id: index + 1,
            name,
            country,
            flag: '',
            bestJump,
            attempts: attempts,
            note: note || "-",
        };
    });

    return formattedData
}