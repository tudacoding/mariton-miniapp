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
}
export interface IRef {
  username: string;
  avatar: string;
  refString: string;
  first_name: string;
}
