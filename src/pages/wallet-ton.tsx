import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import { beginCell, toNano } from "@ton/core";
import { useNavigate } from "react-router-dom";
import HomeLayout from "@/modules/home/Layout";
import { useTonConnectUI } from "@tonconnect/ui-react";
import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import FormCard from "@/modules/wallet/FormCard";
import BackgroundWallet from "@/modules/wallet/BackgroundWallet";

const DEPOSIT_WALLET = "0QAszBVzU37ZyRzA0I5Dn-RZoY6qg2FtGWN4Q356vsR_3jX_";

export default function TonWalletPage() {
  const [tonConnectUI] = useTonConnectUI();
  const { accountStore } = useDispatch<Dispatch>();
  const nav = useNavigate();

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

  return (
    <HomeLayout hideBottom>
      <div className="relative h-fix">
        <BackgroundWallet />
        <div className="px-5 pt-24 pb-14 flex flex-col gap-6">
          <FormCard
            title="TON Deposit"
            type="TON"
            onSubmit={(value: number) => {
              return depositTokenTon(value);
            }}
          />
        </div>
        <div className="absolute bottom-[-30px] w-full flex justify-center">
          <BaseAction
            onClick={() => {
              nav("/");
            }}
          >
            <img src={closeButton} />
          </BaseAction>
        </div>
      </div>
    </HomeLayout>
  );
}
