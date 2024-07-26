import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMaritonToken } from "@/hooks/useMaritonToken";
import { useNavigate } from "react-router-dom";
import HomeLayout from "@/modules/home/Layout";

import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import messageBubble from "@/assets/air/message-bubble.png";
import FormCard from "@/modules/wallet/FormCard";
import BackgroundWallet from "@/modules/wallet/BackgroundWallet";
import BaseButton from "@/components/BaseButton";
import useDepositWallet from "@/hooks/useDepositWallet";

export default function WalletPage() {
  const { tokensWallet } = useSelector((s: RootState) => s.accountStore);
  const { mrtBalance } = useMaritonToken();
  const nav = useNavigate();
  const { claimTokenToWallet, depositTokenMrt } = useDepositWallet();

  return (
    <HomeLayout hideBottom>
      <div className="relative h-fix">
        <BaseAction
          className="absolute right-0 animate-ping-click"
          onClick={() => nav("/history-claim")}
        >
          <div className="relative">
            <img src={messageBubble} />
            <span className="absolute text-t-button font-bold top-0 py-2 px-3">History</span>
          </div>
        </BaseAction>
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
            title="MRT Withdrawal"
            type="CLAIM_MRT"
            maxValue={tokensWallet?.mrtTokens ?? 0}
            onSubmit={async (value: number) => {
              await claimTokenToWallet(value);
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
