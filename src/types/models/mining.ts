export interface IMining {
    id: number;
    minedTokens: number;
    totalMinedTokens: number;
    claimTime: string;
    endMiningTime: string;
    createdAt: string;
    updatedAt: string;
    lastBoostTime: string;
    refTokens: number;
    miningLevel: {
        log: { [level: string]: { isTonUpdated: boolean } }
        speed: number,
        level: number,
        mrtNextCost: number,
        mrtNextSpeedIncreased: number,
        tonNextCost: number
    }
}

export type LevelUpType = 'TON' | 'MRT'
