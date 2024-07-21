import { Dispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetTransactions() {
    const { transactionStore } = useDispatch<Dispatch>();
    const { transactions } = useSelector((s: RootState) => s.transactionStore);
    const { account } = useSelector((s: RootState) => s.accountStore);
    useEffect(() => {
        transactionStore.getTransactions(account?.wallet);
    }, [account?.wallet]);
    return { transactions };
}