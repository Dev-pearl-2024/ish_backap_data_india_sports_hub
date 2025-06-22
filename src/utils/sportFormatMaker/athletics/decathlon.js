export const ConvertDecathlon = (data) => {
    return data.slice(2).map((row, index) => {
        const defaultStats = {
            totalPoints: row?.[row?.length - 2],
            run100m: row?.[2],
            run100mPoints: row?.[3],
            longJump: row?.[4],
            longJumpPoints: row?.[5],
            shotPut: row?.[6],
            shotPutPoints: row?.[7],
            highJump: row?.[8],
            highJumpPoints: row?.[9],
            run400m: row?.[10],
            run400mPoints: row?.[11],
            hurdles110m: row?.[12],
            hurdles110mPoints: row?.[13],
            discusThrow: row?.[14],
            discusThrowPoints: row?.[15],
            poleVault: row?.[16],
            poleVaultPoints: row?.[17],
            javelinThrow: row?.[18],
            javelinThrowPoints: row?.[19],
            run1500m: row?.[20],
            run1500mPoints: row?.[21],
        };
        const name = row?.[1];
        return {
            id: row?.[0],
            name,
            ...defaultStats,
        }
    })
}