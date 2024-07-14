/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";

export function useStartMining() {
  const { miningStore } = useDispatch<Dispatch>();
  const { mining } = useSelector((s: RootState) => s.miningStore);
  const { account } = useSelector((s: RootState) => s.accountStore);

  useEffect(() => {
    if (!mining?.id && account?.id) {

      miningStore.startMining({
        id: account?.id,
      });
      miningStore.getLeaderboard();
    }
  }, [account?.id]);

  return {
    mining
  };
}
