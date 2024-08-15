import { IInventory } from "@/types/models/lotteryItem";

export function getTitleLotteryItem(item: IInventory) {
  if (item.type === "ton") {
    return "token";
  } else if (item.type === "discount") {
    return `discount ${item.value}%`;
  } else if (item.type === "puzzle") {
    return `puzzle ${item.value}`;
  }
}
