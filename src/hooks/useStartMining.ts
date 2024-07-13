/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { get } from "lodash-es";

export function useStartMining() {
  const { miningStore } = useDispatch<Dispatch>();
  const { mining } = useSelector((s: RootState) => s.miningStore);
  const { account } = useSelector((s: RootState) => s.accountStore);

  useEffect(() => {
    if (!mining?.id && account?.id) {
      const { first_name, last_name, id, avatar } = get(window, "Telegram.WebApp.initDataUnsafe.user", {}) as any;

      miningStore.startMining({
        id: account?.id,
        telegramUserId: id,
        telegramName: first_name + " " + last_name,
        telegramAvatar: avatar
      });
      miningStore.getLeaderboard();
    }
  }, [account?.id]);

  return {
    mining
  };
}
