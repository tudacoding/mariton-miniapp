import { useNavigate } from "react-router-dom";
import HomeLayout from "@/modules/home/Layout";
import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import FormCard from "@/modules/wallet/FormCard";
import BackgroundWallet from "@/modules/wallet/BackgroundWallet";
import { useMaritonToken } from "@/hooks/useMaritonToken";
import useDepositWallet from "@/hooks/useDepositWallet";


export default function TonWalletPage() {
  const nav = useNavigate();
  const { tonBalance, client } = useMaritonToken();

  const { depositTokenTon } = useDepositWallet({ client });
  return (
    <HomeLayout hideBottom>
      <div className="relative h-fix">
        <BackgroundWallet />
        <div className="px-4 pt-24 pb-14 flex flex-col gap-6">
          <FormCard
            maxValue={tonBalance}
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
