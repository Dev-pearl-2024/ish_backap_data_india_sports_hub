export const ConvertRaceData = (rawData) => {
    const result = rawData?.slice(1)?.map((item, index) => {
        console.log(item, "data::::")
        return {
            id: index + 1,
            name: item[1],
            country: item[3],
            time: item[4],
            note: item[6], // Default since data doesn’t contain result/status
            flag: ''
        }
    });
    console.log(result, "result data : :::::")
    return result
}