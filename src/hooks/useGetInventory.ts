/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useTonWallet } from "@tonconnect/ui-react";
import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";

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
        pagination: {
          page: currentPage || 1,
          pageSize: 4,
        },
      });
    }
    if (get(wallet, "account.address")) {
      getInventory();
    } else {
      navigate("/");
    }
  }, [wallet, currentPage]);

  return {
    inventory,
  };
}
