export default interface LotteryItem {
  id: number;
  type: string;
  value: string;
}
export interface IInventory {
  amount?: number;
  type: string;
  value: string;
  id: number;
}

export enum EMonster {
  FIRE = "fire",
  WATER = "water",
  TREE = "tree",
}
export enum ELotteryItem {
  TON = "ton",
  DISCOUNT = "discount",
  PUZZLE = "puzzle",
}