import HomeLayout from "@/modules/home/Layout";
import ListTransactions from "@/modules/wallet/ListTransactions";
import background from "@/assets/air/short-background-body.png";
import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import { useNavigate } from "react-router-dom";
import useGetTransactions from "@/hooks/useGetTransactions";
import useDepositWallet from "@/hooks/useDepositWallet";
import BaseTitleDivider from "@/components/BaseTitleDivider";

export default function HistoryClaim() {
  const nav = useNavigate();
  const { transactions } = useGetTransactions();
  const { claimMRTTokens } = useDepositWallet();
  return (
    <HomeLayout hideBottom>
      <div className="h-full flex py-3 pb-12">
        <div className="relative grow flex">
          <img
            className="w-full h-full absolute z-[-10]"
            src={background}
            alt="bg-mission-body"
          />
          <div className="grow overflow-auto px-6 mb-10 mt-4">
            <BaseTitleDivider className="pt-0">History Claim</BaseTitleDivider>

            <ListTransactions
              claimToken={(transaction) => {
                claimMRTTokens(transaction);
              }}
              transactions={transactions}
            />
          </div>
          <div className="absolute bottom-[-30px] w-full flex justify-center">
            <BaseAction
              onClick={() => {
                nav("/wallet-mrt");
              }}
            >
              <img src={closeButton} />
            </BaseAction>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
