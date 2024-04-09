import {
  Address,
  beginCell,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
} from "@ton/core";

export type RoyaltyParams = {
  mintPrice: number;
  maxQuantity: number;
  royaltyAddress: Address;
};

export type NftCollectionConfig = {
  ownerAddress: Address;
  nextItemIndex: number;
  collectionContent: Cell;
  nftItemCode: Cell;
  royaltyParams: RoyaltyParams;
};

export function nftCollectionConfigToCell(config: NftCollectionConfig): Cell {
  return beginCell()
    .storeAddress(config.ownerAddress)
    .storeUint(config.nextItemIndex, 64)
    .storeRef(config.collectionContent)
    .storeRef(config.nftItemCode)
    .storeRef(
      beginCell()
        .storeUint(config.royaltyParams.mintPrice, 64)
        .storeUint(config.royaltyParams.maxQuantity, 64)
        .storeAddress(config.royaltyParams.royaltyAddress)
    )
    .endCell();
}

export class NftCollection implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new NftCollection(address);
  }

  static createFromConfig(
    config: NftCollectionConfig,
    code: Cell,
    workchain = 0
  ) {
    const data = nftCollectionConfigToCell(config);
    const init = { code, data };
    return new NftCollection(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  async sendMintNft(
    provider: ContractProvider,
    via: Sender,
    opts: {
      value: bigint;
      queryId: number;
      amount: bigint; // to send with nft
      itemIndex: number;
      itemOwnerAddress: Address;
      itemContent: Cell;
    }
  ) {
    const nftMessage = beginCell();
    nftMessage.storeAddress(opts.itemOwnerAddress);
    nftMessage.storeRef(opts.itemContent);
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(1, 32) // operation
        .storeUint(opts.queryId, 64)
        .storeUint(opts.itemIndex, 64)
        .storeCoins(opts.amount)
        .storeRef(nftMessage) // body
        .endCell(),
    });
  }

  async getCollectionData(provider: ContractProvider): Promise<{
    nextItemId: bigint;
    ownerAddress: Address;
    collectionContent: Cell;
  }> {
    const collection_data = await provider.get("get_collection_data", []);
    const stack = await collection_data.stack;
    const nextItem: bigint = stack.readBigNumber();
    const collectionContent = await stack.readCell();
    const ownerAddress = await stack.readAddress();
    return {
      nextItemId: nextItem,
      collectionContent: collectionContent,
      ownerAddress: ownerAddress,
    };
  }
  async getRoyaltyParams(provider: ContractProvider) {
    const res = await provider.get("royalty_params", []);
    const mintPrice: bigint = await res.stack.readBigNumber();
    const maxQuantity: bigint = await res.stack.readBigNumber();
    const itemAddress = await res.stack.readAddress();
    return { mintPrice, maxQuantity, itemAddress };
  }
}
