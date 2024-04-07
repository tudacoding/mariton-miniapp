// import { useEffect, useState } from "react";
import { NftCollection } from "../contract/collection";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, toNano } from "@ton/core";
import { setItemContentCell } from "@/utils/onChain";

export function useCollectionContract() {
  const client = useTonClient();
  // const [val, setVal] = useState<null | string>();
  const { sender } = useTonConnect();

  // const sleep = (time: number) =>
  //   new Promise((resolve) => setTimeout(resolve, time));

  const collectionContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new NftCollection(
      Address.parse("EQA5ZtERS_pzpGpJQ5KW_6WDpQ15JV1qNlLPuo5swZBUtt_X")
    );
    return client.open(contract) as OpenedContract<NftCollection>;
  }, [client]);

  // useEffect(() => {
  //   async function getValue() {
  //     if (!counterContract) return;
  //     setVal(null);
  //     const val = await counterContract.getCounter();
  //     setVal(val.toString());
  //     await sleep(5000); // sleep 5 seconds and poll value again
  //     getValue();
  //   }
  //   getValue();
  // }, [counterContract]);
  const randomSeed = Math.floor(Math.random() * 10000);
  return {
    // value: val,
    address: collectionContract?.address.toString(),
    sendMintNft: () => {
      return collectionContract?.sendMintNft(sender, {
        value: toNano("3"), // số tiền chuyển đến nft collection
        queryId: randomSeed,
        amount: toNano("2.1"), // số tiền chuyển đến nft contract
        itemIndex: 3,
        itemOwnerAddress: sender.address as Address,
        itemContent: setItemContentCell({
          name: "OnChain 2",
          description: "Holds onchain metadata 2",
          image:
            "https://raw.githubusercontent.com/Cosmodude/Nexton/main/Nexton_Logo.jpg",
        }),
      });
    },
  };
}
