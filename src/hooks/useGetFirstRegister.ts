/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useTonWallet } from "@tonconnect/ui-react";
import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";
import useGetInforTelegram from "./useGetInforTelegram";

export function useGetFirstRegister() {
  const wallet = useTonWallet();
  const { accountStore } = useDispatch<Dispatch>();
  const { account } = useSelector((s: RootState) => s.accountStore);
  const navigate = useNavigate();
  const { telegramName, avatar, id } = useGetInforTelegram()
  useEffect(() => {
    async function checkConnection() {
      // if (account) return;
      const res = await accountStore.getFirstRegister({
        address: get(wallet, "account.address"),
        publicKey: get(wallet, "account.publicKey"),
        telegramUserId: id,
        telegramName,
        telegramAvatar: avatar
      });
      if (res?.type === 'UNIQUE_TELEGRAM_ID_TYPE') {
        navigate("/welcome");
      }
    }


    if (get(wallet, "account.address")) {
      checkConnection();
    } else {
      navigate("/");
    }
  }, [wallet]);

  return {
    account,
  };
}
