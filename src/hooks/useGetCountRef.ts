/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useTonWallet } from "@tonconnect/ui-react";
import { get } from "lodash-es";

export function useGetCountRef() {
  const wallet = useTonWallet();
  const { accountStore } = useDispatch<Dispatch>();
  const { countRef } = useSelector((s: RootState) => s.accountStore);
  useEffect(() => {
    async function getCountRef() {
      await accountStore.getRef({
        address: get(wallet, "account.address"),
      });
    }
    if (get(wallet, "account.address")) {
      getCountRef();
    }
  }, [wallet]);

  return {
    countRef,
  };
}
