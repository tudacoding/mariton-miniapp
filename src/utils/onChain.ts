import { beginCell, Cell } from "@ton/core";
import { sha256_sync } from "@ton/crypto";

export function toSha256(s: string): bigint {
  return BigInt("0x" + sha256_sync(s).toString("hex"));
}

export function toTextCell(s: string): Cell {
  return beginCell().storeUint(0, 8).storeStringTail(s).endCell();
}

export type collectionContent = {
  collectionContentUrl: string;
  commonContentUrl: string;
};

export type itemContent = {
  commonContentUrl: string;
};

export function setItemContentCell(content: itemContent): Cell {
  const uriContent = beginCell();
  uriContent.storeBuffer(Buffer.from(content.commonContentUrl));
  return uriContent.endCell();
}
