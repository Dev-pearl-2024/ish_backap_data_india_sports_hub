export const ConvertHeptathlon = (data) => {
    return data.slice(2).map((row, index) => {
        const defaultStats = {
            totalPoints: row?.[row?.length - 2],
            hurdles100m: row?.[2],
            hurdlesPoints: row?.[3],
            highJump: row?.[4],
            highJumpPoints: row?.[5],
            shotPut: row?.[6],
            shotPutPoints: row?.[7],
            run200m: row?.[8],
            run200mPoints: row?.[9],
            longJump:row?.[10],
            longJumpPoints: row?.[11],
            javelinThrow: row?.[12],
            javelinPoints: row?.[13],
            run800m: row?.[14],
            run800mPoints: row?.[15]
        };

        const overrides = {
            0: { shotPutPoints: 1038 }, // Rank 1
            2: { hurdlesPoints: 1123, shotPutPoints: 987 }, // Rank 3
            4: { shotPutPoints: 1038 } // Rank 5
        };
        const { name, country } = { name: row[1] || 'Athlete name', country: '' || '' };
        return {
            rank: row?.[0],
            name,
            country,
            ...defaultStats,
            ...(overrides[index] || {})
        };
    });
}