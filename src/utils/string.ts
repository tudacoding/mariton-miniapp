import { IInventory } from "@/types/models/lotteryItem";

export function getTitleLotteryItem(item: IInventory) {
  if (item.type === "ton") {
    return `${item.value} TON`;
  } else if (item.type === "discount") {
    return `${item.value}% discount`;
  } else if (item.type === "puzzle") {
    return `${item.value} egg piece`;
  }
}
