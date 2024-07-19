export default interface Account {
  id: number;
  wallet: string;
  isActive: boolean;
  totalSpins: number;
  usedSpins: number;
  isUsedFirstSpin: boolean;
  createdAt: Date;
  updatedAt: Date;
  publicKey: string;
  ref?: string;
  completedMission: string;
  telegramUserId: number;
  telegramName: string;
  telegramAvatar: string;
  tonTokens: number;
  mrtTokens: number;
  totalMrtTokensClaimed: number;
  totalRefs: number;
}
export interface IRef {
  username: string;
  avatar: string;
  refString: string;
  first_name: string;
}
export interface ITokensWallet {
  tonTokens?: number;
  mrtTokens?: number;
  totalMrtTokensClaimed?: number;
}

export interface IBoost {
  createdAt: string;
  updatedAt: string;
  type?: any;
  bonusSpeed?: number;
  isActive?: any;
  account: number;
}