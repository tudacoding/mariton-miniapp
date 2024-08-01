import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMaritonToken } from "@/hooks/useMaritonToken";
import { useNavigate } from "react-router-dom";
import HomeLayout from "@/modules/home/Layout";

import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import FormCard from "@/modules/wallet/FormCard";
import BackgroundWallet from "@/modules/wallet/BackgroundWallet";
import useDepositWallet from "@/hooks/useDepositWallet";
import MessageBubble from "@/assets/icons/MessageBubble";
import { useState } from "react";

export default function WalletPage() {
  const { tokensWallet } = useSelector((s: RootState) => s.accountStore);
  const { settings } = useSelector((s: RootState) => s.settingsStore);
  const { mrtBalance, client } = useMaritonToken();
  const nav = useNavigate();
  const { claimTokenToWallet, depositTokenMrt } = useDepositWallet({ client });

  const [messageErrors, setMessageErrors] = useState<any>({
    claim: null,
  });
  return (
    <HomeLayout hideBottom>
      <div className="relative h-fix">
        <BaseAction
          className="absolute animate-ping-click right-[135px]"
          onClick={() => nav("/history-claim")}
        >
          <div className="relative">
            <MessageBubble />
            <span className="absolute text-t-button font-bold top-0 py-2 px-6">
              History
            </span>
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
            errorMessage={messageErrors.claim}
            maxValue={tokensWallet?.mrtTokens ?? 0}
            onChange={(value) => {
              if (Number(value) >= settings.minClaimToken) {
                setMessageErrors({
                  ...messageErrors,
                  claim: null,
                });
              }
            }}
            onSubmit={async (value: number) => {
              if (value >= settings.minClaimToken) {
                setMessageErrors({
                  ...messageErrors,
                  claim: null,
                });
                await claimTokenToWallet(value);
              } else {
                setMessageErrors({
                  ...messageErrors,
                  claim: `Min withdrawal ${settings?.minClaimToken ?? 0} MRT`,
                });
              }
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
