export interface IMining {
    id: number;
    minedTokens: number;
    totalMinedTokens: number;
    claimTime: string;
    endMiningTime: string;
    createdAt: string;
    updatedAt: string;
    lastBoostTime: string;
    friendClaimTokens: number;
    telegramUserId: number;
    telegramName: string;
    telegramAvatar: string;
    totalTokens: number;
    totalFriends: number;
    miningLevel: {
        log: { [level: string]: { isTonUpdated: boolean } }
        speed: number,
        level: number,
        mrtNextCost: number,
        mrtNextSpeedIncreased: number,
        tonNextCost: number,
        missionFriendsLevel: number;
    }
}

export type LevelUpType = 'TON' | 'MRT'

export interface IFriend {
    avatar: string;
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    user_id: number;
    invitebyId: number;
    createdAt: string;
    updatedAt: string;
}
export interface ILeaderboard {
    refs: IMining[],
    mints: IMining[]
}
