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

export function getDescriptionLotteryItem(item: IInventory) {
  const text = 'You have received '
  if (item.type === "ton") {
    return text + 'ton'
  } else if (item.type === "discount") {
    return text + `a coupon`;
  } else if (item.type === "puzzle") {
    return text + `${item.value} egg piece`;
  }
}