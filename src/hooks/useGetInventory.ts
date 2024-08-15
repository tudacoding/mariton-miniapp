/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useTonWallet } from "@tonconnect/ui-react";
import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";
import { IInventory } from "@/types/models/lotteryItem";

const getListInventory = (inventory: any) => {
  const list = {} as any
  inventory?.forEach((item: any) => {
    const key = `${item.attributes.type}-${item.attributes.value}`
    if (!list[key]) {
      list[key] = {
        ...item.attributes, id: item.id, amount: 1
      }
    } else {
      list[key] = {
        ...list[key], amount: list[key].amount + 1
      }
    }

  })
  return Object.values(list) as IInventory[]
}
export function useGetInventory() {
  const wallet = useTonWallet();
  const { accountStore } = useDispatch<Dispatch>();
  const { inventory } = useSelector((s: RootState) => s.accountStore);
  const { currentPage } = useSelector((s: RootState) => s.accountStore);
  const navigate = useNavigate();
  useEffect(() => {
    async function getInventory() {
      await accountStore.getHistoryLottery({
        wallet: get(wallet, "account.address"),
      });
    }
    if (get(wallet, "account.address")) {
      getInventory();
    } else {
      navigate("/");
    }
  }, [wallet, currentPage]);

  return {
    listInventory: getListInventory(inventory),
  };
}
