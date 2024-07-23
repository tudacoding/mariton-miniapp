import HomeLayout from "@/modules/home/Layout";
import ListTransactions from "@/modules/wallet/ListTransactions";
import background from "@/assets/air/short-background-body.png";
import BaseAction from "@/components/BaseAction";
import closeButton from "@/assets/game/close-button.png";
import { useNavigate } from "react-router-dom";
import useGetTransactions from "@/hooks/useGetTransactions";
import useDepositWallet from "@/hooks/useDepositWallet";
import BaseTitleDivider from "@/components/BaseTitleDivider";
import { ITransaction } from "@/types/models/transaction";
import { Address, Cell } from "@ton/core";
import { useEffect, useState } from "react";
import { fetchTransactions } from "@/hooks/useTransaction";

export default function HistoryClaim() {
  const nav = useNavigate();
  const { transactions } = useGetTransactions();
  const { claimMRTTokens } = useDepositWallet();
  const [latestHash, setLatestHash] = useState<string>();
  const [wallet, setWallet] = useState<string>();
  const handleClaim = async (transaction: ITransaction) => {
    if (!transaction)
      return
    setWallet(Address.parseRaw(transaction.wallet).toString())
    const response = await claimMRTTokens(transaction)
    const cell = Cell.fromBoc(Buffer.from(response.boc, 'base64'))[0];
    const hash = cell.hash();
    const latestHash = Buffer.from(hash).toString('base64');
    setLatestHash(latestHash);
    console.log(latestHash)
  }
  useEffect(() => {
    if (!latestHash) return;
    const interval = setInterval(async () => {
      if (!wallet) return;
      const response = await fetchTransactions(wallet);
      const tx = response.transactions.find(
        (tx: any) => tx.in_msg?.hash === latestHash
      );
      if (tx) {
        console.log("Done...")
        clearInterval(interval);
      }
    }, 3000);
  }, [wallet, latestHash]);
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
                handleClaim(transaction);
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
