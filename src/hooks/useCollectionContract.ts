import { NftCollection } from "../contract/collection";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, address, toNano } from "@ton/core";
import { setItemContentCell } from "@/utils/onChain";
import { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import { toast } from "react-toastify";

export function useCollectionContract() {
  const client = useTonClient();
  const [price, setMinPrice] = useState<number>();
  const [maxQuantity, setMaxQuantity] = useState<number>();
  const [curentIndex, setCurrentIndex] = useState<number>(0);
  const [loaded, setIsLoaded] = useState<boolean>(false);
  const { sender } = useTonConnect();
  const userFriendlyAddress = useTonAddress();

  const collectionContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new NftCollection(
      Address.parse("EQCmoppZPfzIY1pNIG68NMYrG91zFGpOLDmY7e3DCrfxWU-m")
    );
    return client.open(contract) as OpenedContract<NftCollection>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!collectionContract) return;
      if (loaded) return;
      toast.loading('loading info 🥚🥚..')
      const collectionData = await collectionContract.getCollectionData();
      const royaltyParams = await collectionContract.getRoyaltyParams();
      setMinPrice(Number(royaltyParams.mintPrice) / 1000000000);
      setMaxQuantity(Number(royaltyParams.maxQuantity));
      setCurrentIndex(Number(collectionData.nextItemId));
      toast.dismiss();
      setIsLoaded(true)
    }
    getValue();
  }, [collectionContract, loaded]);

  const randomSeed = Math.floor(Math.random() * 10000);
  return {
    loaded: loaded,
    mintPrice: price,
    maxQuantity: maxQuantity,
    curentIndex: curentIndex,
    address: collectionContract?.address.toString(),
    sendMintNft: async (type: string) => {
      const collectionData = await collectionContract?.getCollectionData();
      return collectionContract?.sendMintNft(sender, {
        value: toNano(`0.5`),
        queryId: randomSeed,
        amount: toNano(`0.5`),
        itemIndex: Number(collectionData?.nextItemId),
        itemOwnerAddress: address(userFriendlyAddress),
        itemContent: setItemContentCell({
          commonContentUrl: `${type}.json`,
        }),
      });
    },
  };
}
