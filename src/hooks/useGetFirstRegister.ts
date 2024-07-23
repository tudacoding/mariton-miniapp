/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useTonWallet } from "@tonconnect/ui-react";
import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";

export function useGetFirstRegister() {
  const wallet = useTonWallet();
  const { accountStore } = useDispatch<Dispatch>();
  const { account } = useSelector((s: RootState) => s.accountStore);
  const navigate = useNavigate();
  const { first_name, last_name, id, avatar, username } = get(window, "Telegram.WebApp.initDataUnsafe.user", {}) as any;
  const telegramName = username ?? ((first_name || last_name) ? first_name ?? `${first_name} ` + (last_name ?? '') : undefined);

  useEffect(() => {
    async function checkConnection() {
      // if (account) return;
      await accountStore.getFirstRegister({
        address: get(wallet, "account.address"),
        publicKey: get(wallet, "account.publicKey"),
        telegramUserId: id,
        telegramName,
        telegramAvatar: avatar
      });
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
