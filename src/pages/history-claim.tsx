import HomeLayout from "@/modules/home/Layout";
import ListTransactions from "@/modules/wallet/ListTransactions";
import background from "@/assets/air/short-background-body.png";
import { twMerge } from "tailwind-merge";
import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import { useNavigate } from "react-router-dom";
import useGetTransactions from "@/hooks/useGetTransactions";

export default function HistoryClaim() {
  const nav = useNavigate();
  const { transactions } = useGetTransactions();

  return (
    <HomeLayout hideBottom>
      <div className="h-full flex py-3 pb-12">
        <div className="relative grow flex">
          <img
            className="w-full h-full absolute z-[-10]"
            src={background}
            alt="bg-mission-body"
          />
          <div className={twMerge("grow overflow-auto px-6", "mb-5 mt-4")}>
            <ListTransactions transactions={transactions} />
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
