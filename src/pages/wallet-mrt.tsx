import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useMaritonToken } from "@/hooks/useMaritonToken";
import { Address, beginCell, toNano } from "@ton/core";
import { ClaimMRT } from "@/contract/claim";
import { useNavigate } from "react-router-dom";
import HomeLayout from "@/modules/home/Layout";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { JettonMaster } from "@ton/ton";
import { useTonClient } from "@/hooks/useTonClient";

import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import FormCard from "@/modules/wallet/FormCard";
import BackgroundWallet from "@/modules/wallet/BackgroundWallet";

const DEPOSIT_WALLET = "0QAszBVzU37ZyRzA0I5Dn-RZoY6qg2FtGWN4Q356vsR_3jX_";
const addressMrt = "EQBAK2GFaOix6p9rRP2URa2Uf8Th8XvzuymnFPPycyUAGvCp";

export default function WalletPage() {
  const [tonConnectUI] = useTonConnectUI();
  const { miningStore, accountStore } = useDispatch<Dispatch>();
  const { account } = useSelector((s: RootState) => s.accountStore);
  const wallet = useTonWallet();
  const client = useTonClient();

  const { claimMRT, mrtBalance } = useMaritonToken();
  const nav = useNavigate();
  const claimTokenToTonWallet = async (token: number) => {
    console.log("claimTokenToTonWallet");

    const signature = await miningStore.signSignature({
      amount: Number(token),
    });
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
      JettonMaster.create(Address.parse(addressMrt))
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

  return (
    <HomeLayout hideBottom>
      <div className="relative h-fix">
        <BackgroundWallet />
        <div className="px-4 pt-24 pb-14 flex flex-col gap-6">
          <FormCard
            title="MRT Deposit"
            type="MRT"
            maxValue={mrtBalance}
            onSubmit={(value: number) => {
              return depositTokenMrt(value);
            }}
          />
          <FormCard
            title="Withdraw MRT"
            type="CLAIM_MRT"
            maxValue={account.mrtTokens}
            onSubmit={(value: number) => {
              return claimTokenToTonWallet(value);
            }}
          />
        </div>
        <div className="absolute bottom-[-30px] w-full flex justify-center">
          <BaseAction
            onClick={() => {
              nav("/airdrop-home");
            }}
          >
            <img src={closeButton} />
          </BaseAction>
        </div>
      </div>
    </HomeLayout>
  );
}
