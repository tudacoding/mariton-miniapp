import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useMaritonToken } from "@/hooks/useMaritonToken";
import { Address, beginCell, Cell, toNano } from "@ton/core";
import { ClaimMRT } from "@/contract/claim";
import { SendTransactionResponse, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { JettonMaster } from "@ton/ton";
import { useTonClient } from "@/hooks/useTonClient";
import { ADDRESS_MRT, DEPOSIT_WALLET } from "@/config";
import { ITransaction } from "@/types/models/transaction";
import { fetchTransactions } from "@/hooks/useTransaction";
import useGetTransactions from "./useGetTransactions";
import { toast } from "react-toastify";

export default function useDepositWallet() {
    const { claimMRT } = useMaritonToken();
    const { miningStore, accountStore } = useDispatch<Dispatch>();
    const { transactions, getTransactions, setTransactions } = useGetTransactions();
    const wallet = useTonWallet();
    const client = useTonClient();
    const [tonConnectUI] = useTonConnectUI();

    const claimMRTTokens = async (signature: ITransaction) => {
        const buffer = Buffer.from(signature.signature, "hex");
        const signatureCell = beginCell().storeBuffer(buffer).endCell();

        const buildMessage: ClaimMRT = {
            $$type: "ClaimMRT",
            nonce: BigInt(signature.nonce),
            amount: BigInt(signature.amount),
            signature: signatureCell,
        };
        const res = await claimMRT(buildMessage);
        return res;
    }
    const reFetchTransaction = async (response: SendTransactionResponse, wallet: string, index: number | string) => {
        const cell = Cell.fromBoc(Buffer.from(response.boc, 'base64'))[0];
        const hash = cell.hash();
        const latestHash = Buffer.from(hash).toString('base64');

        if (!latestHash) return;
        if (!wallet) return;
        let count = 0;
        const transactionPendings: { [key: string]: boolean } = JSON.parse(localStorage.getItem("transactionPendings") || "{}");
        localStorage.setItem("transactionPendings", JSON.stringify({
            ...transactionPendings,
            [index]: true,
            lastTimeUpdate: new Date().getTime()
        }));

        const interval = setInterval(async () => {
            console.log("Checking...", count++);

            const response = await fetchTransactions(wallet);
            const tx = response.transactions.find(
                (tx: any) => tx.in_msg?.hash === latestHash
            );
            if (tx || count > 10) {
                console.log(!!tx ? "Done..." : "Stop...");
                transactions[index] = { ...transactions[index], isDone: !!tx }
                setTransactions(transactions);
                const transactionPendings: { [key: string]: boolean } = JSON.parse(localStorage.getItem("transactionPendings") || "{}");
                delete transactionPendings[index];
                localStorage.setItem("transactionPendings", JSON.stringify(transactionPendings));
                clearInterval(interval);
            }
        }, 10000);
    }
    const reClaimTokenToWallet = async (transaction: ITransaction, index: number | string) => {
        // const transactionPendings = localStorage.getItem("transactionPendings") || "{}";
        // const isHasPending = transactionPendings !== "{}";
        // if (isHasPending) toast.error("You have a pending transaction, please wait until the transaction is complete");
        const wallet = (Address.parseRaw(transaction.wallet).toString())
        const response = await claimMRTTokens(transaction)
        transactions[index] = { ...transactions[index], isDone: 'pending' }
        setTransactions(transactions);
        reFetchTransaction(response, wallet, index);
    }
    const claimTokenToWallet = async (token: number) => {
        const signature: ITransaction = await miningStore.signSignature({
            amount: Number(token),
        });
        if (!signature) return;
        const res = await claimMRTTokens(signature);
        const dataTransactions = await getTransactions();
        dataTransactions[signature.id] = { ...dataTransactions[signature.id], isDone: 'pending' }
        setTransactions(dataTransactions);
        const wallet = (Address.parseRaw(signature.wallet).toString())
        reFetchTransaction(res, wallet, signature.id);
    };
    const depositTokenMrt = async (token: number) => {
        if (!wallet || !client) return;
        const res = await accountStore.createTransaction({
            type: "MRT",
            amount: Number(toNano(Number(token))),
        });
        if (!res) return;
        const forwardPayload = beginCell()
            .storeUint(0, 32)
            .storeStringTail(res.transactionId)
            .endCell();
        const body = beginCell()
            .storeUint(0xf8a7ea5, 32)
            .storeUint(0, 64)
            .storeCoins(toNano(Number(token)))
            .storeAddress(Address.parse(DEPOSIT_WALLET))
            .storeAddress(Address.parse(wallet.account.address))
            .storeBit(0)
            .storeCoins(toNano("0.01"))
            .storeBit(1)
            .storeRef(forwardPayload)
            .endCell();

        let jettonMasterCustom = client.open(
            JettonMaster.create(Address.parse(ADDRESS_MRT))
        );
        let jettonWalletMRT = await jettonMasterCustom.getWalletAddress(
            Address.parse(wallet.account.address)
        );
        try {
            const response = await tonConnectUI.sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 600,
                messages: [
                    {
                        address: jettonWalletMRT.toString(),
                        amount: toNano(Number(0.1)).toString(),
                        payload: body.toBoc().toString("base64"),
                    },
                ],
            });
            accountStore.getStatusTransaction({ id: res.id });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    const depositTokenTon = async (token: number) => {
        const res = await accountStore.createTransaction({
            type: "TON",
            amount: Number(toNano(Number(token))),
        });
        if (!res) return;
        const bodyTon = beginCell()
            .storeUint(0, 32)
            .storeStringTail(res.transactionId)
            .endCell();

        try {
            const response = await tonConnectUI.sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 600,
                messages: [
                    {
                        address: DEPOSIT_WALLET,
                        amount: toNano(Number(token)).toString(),
                        payload: bodyTon.toBoc().toString("base64"),
                    },
                ],
            });
            accountStore.getStatusTransaction({ id: res.id });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        claimTokenToWallet,
        depositTokenMrt,
        depositTokenTon,
        claimMRTTokens,
        reClaimTokenToWallet
    }
}