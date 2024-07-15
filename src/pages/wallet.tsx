import background from "@/assets/air/background-body-short.png";
import BaseButton from "@/components/BaseButton";
import BaseDivider from "@/components/BaseDivider";
import closeButton from "@/assets/game/close-button.png";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useMaritonToken } from "@/hooks/useMaritonToken";
// import mrtPng from "@/assets/air/mariton-tk-ico.png";
// import tonPng from "@/assets/game/lottery-item/ton.png";
import { beginCell } from "@ton/core";
import { ClaimMRT } from "@/contract/claim";
import { useNavigate } from "react-router-dom";
import HomeLayout from "@/modules/home/Layout";
import BaseInput from "@/components/BaseInput";
import { useState } from "react";

// function CardToken({ title, ton = 0.0, mrt = 0.0 }: any) {
//   return (
//     <div className="w-full">
//       <p className="text-t-button text-center font-extrabold text-[24px] mb-6 leading-[18px]">
//         {title}
//       </p>
//       <div className="border border-solid rounded-2xl bg-[#FDFCDE] px-6 py-3">
//         <div className="flex justify-between items-center">
//           <span className="text-t-title font-bold text-xs">TON Tonken</span>
//           <div className="flex flex-row gap-1 items-center">
//             <span className="text-t-title font-bold text-2xl">
//               {Number(ton).toFixed(2)}
//             </span>
//             <img
//               src={tonPng}
//               alt=""
//               width={20}
//               className="object-contain pt-0.5"
//             />
//           </div>
//         </div>
//         <BaseDivider className="h-[1px] my-3" />
//         <div className="flex justify-between items-center">
//           <span className="text-t-title font-bold text-xs">MRT Tonken</span>
//           <div className="flex flex-row gap-1">
//             <span className="text-t-title font-bold text-2xl">
//               {Number(mrt).toFixed(2)}
//             </span>
//             <img
//               src={mrtPng}
//               alt=""
//               width={20}
//               className="object-contain pt-0.5"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function WalletPage() {
  const { miningStore } = useDispatch<Dispatch>();
  const { mining } = useSelector((s: RootState) => s.miningStore);
  const { claimMRT, tonBalance, mrtBalance } = useMaritonToken();
  const nav = useNavigate();
  const claimTokenToTonWallet = async () => {
    console.log("claimTokenToTonWallet");

    const signature = await miningStore.signSignature({
      amount: mrtInGame,
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
    if(res) setMrtInGame(undefined);
    return res;
  };
  const [ton, setTon] = useState<number>();
  const [mrt, setMrt] = useState<number>();
  const [mrtInGame, setMrtInGame] = useState<number>();
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
            <p className="text-t-button text-center font-extrabold text-[24px] mb-6 leading-[18px]">
              DEPOSIT
            </p>
            <div className="flex flex-row gap-3 pb-2">
              {/* ton */}
              <BaseInput
                name="ton"
                value={ton}
                onChange={(event) => {
                  setTon(Number(event.target.value));
                }}
              />
              <BaseButton
                className="flex flex-row justify-center items-center gap-1 bg-b-secondary py-2"
                onClick={() => {
                  setTon(tonBalance);
                }}
              >
                <span className="text-sm pt-0.5">Max</span>
              </BaseButton>
              <BaseButton
                className="flex flex-row justify-center items-center gap-1 bg-b-secondary py-2"
                onClick={() => {}}
              >
                <span className="text-sm pt-0.5">Deposit</span>
              </BaseButton>
            </div>

            {/* mrt */}
            <div className="flex flex-row gap-3 pb-2">
              <BaseInput
                name="mrt"
                value={mrt}
                onChange={(event) => {
                  setMrt(Number(event.target.value));
                }}
              />

              <BaseButton
                className="flex flex-row justify-center items-center gap-1 bg-b-secondary py-2"
                onClick={() => {
                  setMrt(mrtBalance);
                }}
              >
                <span className="text-sm pt-0.5">Max</span>
              </BaseButton>
              <BaseButton
                className="flex flex-row justify-center items-center gap-1 bg-b-secondary py-2"
                onClick={() => {}}
              >
                <span className="text-sm pt-0.5">Deposit</span>
              </BaseButton>
            </div>
            <BaseDivider className="my-6 h-[1px]" />
            <p className="text-t-button text-center font-extrabold text-[24px] mb-6 leading-[18px]">
              CLAIM MRT
            </p>

            <div className="flex flex-row gap-3 pb-2">
              <BaseInput
                name="mrtInGame"
                type="number"
                value={mrtInGame}
                onChange={(event) => {
                  setMrtInGame(Number(event.target.value));
                }}
              />

              <BaseButton
                className="flex flex-row justify-center items-center gap-1 bg-b-secondary py-2"
                onClick={() => {
                  setMrtInGame(Number(mining.totalMinedTokens));
                }}
              >
                <span className="text-sm pt-0.5">Max</span>
              </BaseButton>
              <BaseButton
                className="flex flex-row justify-center items-center gap-1 bg-b-secondary py-2"
                onClick={() => {
                  claimTokenToTonWallet();
                }}
              >
                <span className="text-sm pt-0.5">Claim</span>
              </BaseButton>
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
