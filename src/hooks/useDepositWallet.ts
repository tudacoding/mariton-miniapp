import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useMaritonToken } from "@/hooks/useMaritonToken";
import { Address, beginCell, Cell, toNano } from "@ton/core";
import { ClaimMRT } from "@/contract/claim";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { JettonMaster } from "@ton/ton";
import { useTonClient } from "@/hooks/useTonClient";
import { ADDRESS_MRT, DEPOSIT_WALLET } from "@/config";
import { ITransaction } from "@/types/models/transaction";
import { fetchTransactions } from "@/hooks/useTransaction";

export default function useDepositWallet() {
    const { claimMRT } = useMaritonToken();
    const { miningStore, accountStore, transactionStore } = useDispatch<Dispatch>();
    const { transactions } = useSelector((s: RootState) => s.transactionStore);
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
    const reClaimTokenToWallet = async (transaction: ITransaction, index: number) => {
        if (!transaction) return;
        transactions[index] = { ...transactions[index], isDone: 'pending' }
        transactionStore.setTransactions(transactions);
        const wallet = (Address.parseRaw(transaction.wallet).toString())
        const response = await claimMRTTokens(transaction)
        const cell = Cell.fromBoc(Buffer.from(response.boc, 'base64'))[0];
        const hash = cell.hash();
        const latestHash = Buffer.from(hash).toString('base64');

        if (!latestHash) return;
        if (!wallet) return;
        const interval = setInterval(async () => {
            console.log("Checking...");

            const response = await fetchTransactions(wallet);
            const tx = response.transactions.find(
                (tx: any) => tx.in_msg?.hash === latestHash
            );
            if (tx) {
                console.log("Done...")
                transactions[index] = { ...transactions[index], isDone: true }
                transactionStore.setTransactions(transactions);
                clearInterval(interval);
            }
        }, 5000);
    }
    const claimTokenToWallet = async (token: number) => {
        const signature = await miningStore.signSignature({
            amount: Number(token),
        });
        const res = await claimMRTTokens(signature);
        return res;
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