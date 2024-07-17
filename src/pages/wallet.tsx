import background from "@/assets/air/background-body-short.png";
import BaseButton from "@/components/BaseButton";
import BaseDivider from "@/components/BaseDivider";
import closeButton from "@/assets/game/close-button.png";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/store/store";
import { useMaritonToken } from "@/hooks/useMaritonToken";
// import mrtPng from "@/assets/air/mariton-tk-ico.png";
// import tonPng from "@/assets/game/lottery-item/ton.png";
import { Address, beginCell, toNano } from "@ton/core";
import { ClaimMRT } from "@/contract/claim";
import { useNavigate } from "react-router-dom";
import HomeLayout from "@/modules/home/Layout";
import BaseInput from "@/components/BaseInput";
import { useState } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { JettonMaster } from "@ton/ton";
import { useTonClient } from "@/hooks/useTonClient";
const DEPOSIT_WALLET = "0QAszBVzU37ZyRzA0I5Dn-RZoY6qg2FtGWN4Q356vsR_3jX_";
const addressMrt = "EQBAK2GFaOix6p9rRP2URa2Uf8Th8XvzuymnFPPycyUAGvCp";
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
  const [tonConnectUI] = useTonConnectUI();
  const { miningStore, accountStore } = useDispatch<Dispatch>();
  const { account } = useSelector((s: RootState) => s.accountStore);
  const [ton, setTon] = useState<string | number>();
  const [mrt, setMrt] = useState<string | number>();
  const [mrtInGame, setMrtInGame] = useState<string | number>();
  const wallet = useTonWallet();
  const client = useTonClient();

  const { claimMRT, tonBalance, mrtBalance } = useMaritonToken();
  const nav = useNavigate();
  const claimTokenToTonWallet = async () => {
    console.log("claimTokenToTonWallet");

    const signature = await miningStore.signSignature({
      amount: Number(mrtInGame),
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
    if (res) setMrtInGame(undefined);
    return res;
  };
  const depositTokenTon = async () => {
    const res = await accountStore.createTransaction({
      type: "TON",
      amount: Number(toNano(Number(ton))),
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
            amount: toNano(Number(ton)).toString(),
            payload: bodyTon.toBoc().toString("base64"),
          },
        ],
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const depositTokenMrt = async () => {
    if (!wallet || !client) return;
    const res = await accountStore.createTransaction({
      type: "MRT",
      amount: Number(toNano(Number(mrt))),
    });
    if (!res) return;
    const forwardPayload = beginCell()
      .storeUint(0, 32)
      .storeStringTail(res.transactionId)
      .endCell();
    const body = beginCell()
      .storeUint(0xf8a7ea5, 32)
      .storeUint(0, 64)
      .storeCoins(toNano(Number(mrt)))
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
            <p className="text-t-button text-center font-extrabold text-[24px] mb-6 leading-[18px]">
              DEPOSIT
            </p>
            <div className="flex flex-row gap-3 pb-2">
              {/* ton */}
              <BaseInput
                name="ton"
                value={ton}
                onChange={(event) => {
                  setTon(event.target.value);
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
                onClick={() => {
                  depositTokenTon();
                }}
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
                  setMrt(event.target.value);
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
                onClick={() => {
                  depositTokenMrt();
                }}
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
                  setMrtInGame(event.target.value);
                }}
              />

              <BaseButton
                className="flex flex-row justify-center items-center gap-1 bg-b-secondary py-2"
                onClick={() => {
                  setMrtInGame(account.mrtTokens);
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
