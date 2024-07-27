import { MaritonToken, Mint } from "../contract/token";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, address, toNano, fromNano, beginCell } from "@ton/core";
import { useEffect, useState } from "react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { toast } from "react-toastify";
import { ClaimMRT, ClaimToken, storeClaimMRT } from "../contract/claim";
import { JettonWallet } from "@ton/ton";
import { CLAIM_ADDRESS, MRT_ADDRESS } from "@/config";

export function useMaritonToken() {
  const client = useTonClient();
  const [loaded, setIsLoaded] = useState<boolean>(false);
  const [MRT, setMRT] = useState<number>(0);
  const [TON, setTON] = useState<number>(0);
  const { sender } = useTonConnect();
  const userFriendlyAddress = useTonAddress();
  const wallet = userFriendlyAddress ? address(userFriendlyAddress) : null;
  const mrtAddress = Address.parse(
    MRT_ADDRESS
  );
  const claimAddress = Address.parse(
    CLAIM_ADDRESS
  );

  const tokenContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = await MaritonToken.fromAddress(mrtAddress);
    return client.open(contract) as OpenedContract<MaritonToken>;
  }, [client]);

  const claimContract = useAsyncInitialize(async () => {
    if (!client) return;
    const claimCT = await ClaimToken.fromAddress(claimAddress);
    return client.open(claimCT) as OpenedContract<ClaimToken>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!client) return;
      if (!tokenContract) return;
      if (!claimContract) return;
      if (!wallet) return;
      if (loaded) return;
      // toast.loading("loading info 🥚🥚..");
      //Check MRT token:
      try {
        const tonBalance = await client.getBalance(wallet);
        const walletAddress = await tokenContract.getGetWalletAddress(wallet);
        const userJettonWallet = JettonWallet.create(walletAddress);
        const userJettonWalletContract = client.open(userJettonWallet);
        const mrtBalance = await userJettonWalletContract.getBalance();
        setTON(fromNano(tonBalance) as any);
        setMRT(fromNano(mrtBalance) as any);
      } catch (error) {
        console.log(error);
      } finally {
        toast.dismiss();
        setIsLoaded(true);
      }
    }
    getValue();
  }, [client, tokenContract, loaded, wallet]);

  return {
    client,
    loaded: loaded,
    wallet: userFriendlyAddress ? address(userFriendlyAddress) : null,
    tonBalance: TON,
    mrtBalance: MRT,
    withdrawTon: async () => {
      return await claimContract?.send(
        sender,
        {
          value: toNano("0.005"),
        },
        "withdraw"
      );
    },
    MintClose: async () => {
      return await tokenContract?.send(
        sender,
        {
          value: toNano("0.005"),
        },
        "Owner: MintClose"
      );
    },
    mintMRT: async () => {
      const message: Mint = {
        $$type: "Mint",
        amount: toNano("10000"),
        receiver: claimAddress,
      };
      return await tokenContract?.send(
        sender,
        {
          value: toNano("0.005"),
        },
        message
      );
    },
  };
}
export function useMaritonTokenMethod() {
  const [tonConnectUI] = useTonConnectUI();
  const claimAddress = Address.parse(
    CLAIM_ADDRESS
  );
  return {
    claimMRT: async (message: ClaimMRT) => {
      const response = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: claimAddress.toString(),
            amount: toNano(Number(0.1)).toString(),
            payload: beginCell()
              .store(storeClaimMRT(message))
              .endCell()
              .toBoc()
              .toString("base64"),
          },
        ],
      });
      return response
    },
  }
}
