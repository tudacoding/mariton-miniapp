import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import { useMaritonToken } from "@/hooks/useMaritonToken";
import { Address, beginCell, toNano } from "@ton/core";
import { ClaimMRT } from "@/contract/claim";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { JettonMaster } from "@ton/ton";
import { useTonClient } from "@/hooks/useTonClient";
import { ADDRESS_MRT, DEPOSIT_WALLET } from "@/config";

export default function useDepositWallet() {
    const { claimMRT } = useMaritonToken();
    const { miningStore, accountStore } = useDispatch<Dispatch>();
    const wallet = useTonWallet();
    const client = useTonClient();
    const [tonConnectUI] = useTonConnectUI();

    const claimMRTTokens = async (signature: any) => {
        const buffer = Buffer.from(signature.signature, "hex");
        const signatureCell = beginCell().storeBuffer(buffer).endCell();

        const buildMessage: ClaimMRT = {
            $$type: "ClaimMRT",
            nonce: BigInt(signature.nonce),
            amount: BigInt(signature.amount),
            signature: signatureCell,
        };
        const res = await claimMRT(buildMessage);
        console.log(res);

        return res;
    }
    const claimTokenToTonWallet = async (token: number) => {
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
        claimTokenToTonWallet,
        depositTokenMrt,
        depositTokenTon,
        claimMRTTokens
    }
}