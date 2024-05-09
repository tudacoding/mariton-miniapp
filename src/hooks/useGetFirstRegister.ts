/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useTonWallet } from "@tonconnect/ui-react";
import { get } from "lodash-es";

export function useGetFirstRegister() {
  const wallet = useTonWallet();
  const { accountStore } = useDispatch<Dispatch>();
  const { account } = useSelector((s: RootState) => s.accountStore);
  useEffect(() => {
    async function checkConnection() {
      if (account) return;
      await accountStore.getFirstRegister({
        address: get(wallet, "account.address"),
        publicKey: get(wallet, "account.publicKey"),
      });
    }
    if (get(wallet, "account.address")) {
      checkConnection();
    }
  }, [wallet]);

  return {
    account,
  };
}
