import Account from "./account";

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
    totalTokens: number;
    totalFriends: number;
    speedLevel: {
        log: { [level: string]: { isTonUpdated: boolean } }
        speed: number,
        level: number,
        mrtNextCost: number,
        mrtNextSpeedIncreased: number,
        tonNextCost: number,
        missionFriendsLevel: number;
    },
    account: Account;
}

export type LevelUpType = 'TON' | 'MRT'
export enum EBoostType {
    CHECKIN = 'CHECKIN',
    JUNIOR_RICH_MARITON = 'JUNIOR_RICH_MARITON',
    MARITON_AMBASSADOR = 'MARITON_AMBASSADOR',
    ONE_TIME_MISSION = 'ONE_TIME_MISSION',
}
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
    refs: Account[],
    mints: Account[]
}
