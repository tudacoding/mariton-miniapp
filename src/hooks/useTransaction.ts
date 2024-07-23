import { useEffect, useRef, useState } from "react";
import config from "@/config";
export const fetchTransactions = async (address: string) => {
    const r = await fetch(
        `${config.tonApi}/transactions?account=${address}&limit=10`
    );
    return r.json();
}

export const useTransactions = (address: string) => {
    const [txn, setTxn] = useState<any[]>();
    const preRef = useRef<string>();

    useEffect(() => {
        if (preRef.current === address) return;
        preRef.current = address;
        fetchTransactions(address).then((response: any) => {
            setTxn(response.transactions);
        });
    }, [address]);
    return { txn };
};