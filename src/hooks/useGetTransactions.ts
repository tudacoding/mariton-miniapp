import { Dispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useGetTransactions() {
    const { fetchTransactions, setTransactions } = useDispatch<Dispatch>().transactionStore;
    const { transactions } = useSelector((s: RootState) => s.transactionStore);
    const { account } = useSelector((s: RootState) => s.accountStore);

    async function getTransactions() {
        return await fetchTransactions(account?.wallet);
    }
    return { transactions, getTransactions, setTransactions };
}