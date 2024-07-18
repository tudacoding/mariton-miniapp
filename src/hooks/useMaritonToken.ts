import { MaritonToken, Mint } from "../contract/token";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, address, toNano, fromNano } from "@ton/core";
import { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import { toast } from "react-toastify";
import { ClaimMRT, ClaimToken } from "../contract/claim";
import { JettonWallet } from "@ton/ton";

export function useMaritonToken() {
  const client = useTonClient();
  const [loaded, setIsLoaded] = useState<boolean>(false);
  const [MRT, setMRT] = useState<number>(0);
  const [TON, setTON] = useState<number>(0);
  const { sender } = useTonConnect();
  const userFriendlyAddress = useTonAddress();
  const wallet = address(userFriendlyAddress);
  const mrtAddress = Address.parse(
    "EQBAK2GFaOix6p9rRP2URa2Uf8Th8XvzuymnFPPycyUAGvCp"
  );
  const claimAddress = Address.parse(
    "EQByc9YFB3yeNTcSPo2WF5gvMYDKLsz9Sr2PpkVsoYlz-gyl"
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
  }, [client, tokenContract, loaded]);

  return {
    loaded: loaded,
    wallet: address(userFriendlyAddress),
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
    claimMRT: async (message: ClaimMRT) => {
      return await claimContract?.send(
        sender,
        {
          value: toNano("0.1"),
        },
        message
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
