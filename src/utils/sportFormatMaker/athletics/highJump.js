export const ConvertHighJump = (rawData) => {
    const heights = rawData?.[1]?.slice(4, 17); // extract jump heights
    console.log(rawData,"score data::::")
    const getResult = (value) => {
        if (!value || value.length === 0) return 'empty';
        const val = value[0];
        if (val?.includes('o') && !val?.includes('x')) return 'success';
        if (val?.includes('x') && !val?.includes('o')) return 'fail';
        if (val?.includes('xo') || val?.includes('xxo')) return 'success';
        if (val?.includes('xxx')) return 'fail';
        return 'pass';
    };

    const output = rawData.slice(2).map((row, index) => {
        const name = row[1];
        const country = row[3];
        const bestJump = row[17];
        const flag = '';
        const attempts = heights?.map((height, i) => ({
            height,
            result: getResult(row[4 + i])
        }));

        return {
            id: index + 1,
            name: `${name} (${country})`,
            country,
            flag,
            heights,
            bestJump,
            note: '-', // customize if needed
            attempts
        };
    });
    return output
}