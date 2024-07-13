import background from "@/assets/air/background-body-short.png";
import Wallet from "@/assets/icons/Wallet";
import BaseButton from "@/components/BaseButton";
import BaseDivider from "@/components/BaseDivider";
import closeButton from "@/assets/game/close-button.png";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import { useMaritonToken } from "@/hooks/useMaritonToken";
import mrtPng from "@/assets/air/mariton-tk-ico.png";
import tonPng from "@/assets/game/lottery-item/ton.png";
import { beginCell } from "@ton/core";
import { ClaimMRT } from "@/contract/claim";
import { twJoin } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import HomeLayout from "@/modules/home/Layout";

function CardToken({ title, ton = 0.0, mrt = 0.0 }: any) {
  return (
    <div className="w-full">
      <p className="text-t-button text-center font-extrabold text-[24px] mb-6 leading-[18px]">
        {title}
      </p>
      <div className="border border-solid rounded-2xl bg-[#FDFCDE] px-6 py-3">
        <div className="flex justify-between items-center">
          <span className="text-t-title font-bold text-xs">TON Tonken</span>
          <div className="flex flex-row gap-1 items-center">
            <span className="text-t-title font-bold text-2xl">
              {Number(ton).toFixed(2)}
            </span>
            <img
              src={tonPng}
              alt=""
              width={20}
              className="object-contain pt-0.5"
            />
          </div>
        </div>
        <BaseDivider className="h-[1px] my-3" />
        <div className="flex justify-between items-center">
          <span className="text-t-title font-bold text-xs">MRT Tonken</span>
          <div className="flex flex-row gap-1">
            <span className="text-t-title font-bold text-2xl">
              {Number(mrt).toFixed(2)}
            </span>
            <img
              src={mrtPng}
              alt=""
              width={20}
              className="object-contain pt-0.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
function ActionCard({ title, onClick }: any) {
  return (
    <div
      className={twJoin(
        "rounded-xl bg-[#B19B5E] flex flex-col justify-center text-center py-[20px] items-center gap-2",
        "bg-b-primary active:opacity-75 duration-100 active:scale-[0.95]"
      )}
      onClick={onClick}
    >
      <Wallet />
      <span>{title}</span>
    </div>
  );
}
export default function WalletPage() {
  const { miningStore } = useDispatch<Dispatch>();
  const { claimMRT } = useMaritonToken();
  const nav = useNavigate();
  const { tonBalance, mrtBalance } = { tonBalance: 0.0, mrtBalance: 0.0 };
  const claimTokenToTonWallet = async () => {
    console.log("claimTokenToTonWallet");

    const signature = await miningStore.signSignature({});
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

  return (
    <HomeLayout hideNavbar>
      <div className="h-full flex">
        <div className="relative grow flex mb-10">
          <img
            className="w-full h-full absolute z-[-10] pt-4"
            src={background}
            alt="bg-mission-body"
          />
          <div className={"grow overflow-auto px-6 mb-5 mt-6 pt-4"}>
            <CardToken title={"TON WALLET"} ton={tonBalance} mrt={mrtBalance} />
            <BaseDivider className="my-6 h-[1px]" />
            <CardToken title={"MARITON WALLET"} />

            <div className="grid grid-cols-2 gap-5 py-5 w-full">
              <ActionCard title="Deposit" onClick={claimTokenToTonWallet} />
              <ActionCard title="Withdraw" />
            </div>
          </div>
          <div className="absolute bottom-[-30px] flex flex-row justify-center w-full gap-4">
            <BaseButton
              className="!p-0 !bg-transparent"
              onClick={() => {
                nav(-1);
              }}
            >
              <img src={closeButton} alt="" className="object-contain" />
            </BaseButton>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
