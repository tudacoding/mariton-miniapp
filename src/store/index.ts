import type { Models } from "@rematch/core";

import accountStore from "./modules/account";
import spinStore from "./modules/spin";
import actionsStore from "./modules/actions";
import miningStore from "./modules/mining";
import transactionStore from "./modules/transaction";

export interface RootModel extends Models<RootModel> {
  accountStore: typeof accountStore;
  spinStore: typeof spinStore;
  actionsStore: typeof actionsStore;
  miningStore: typeof miningStore;
  transactionStore: typeof transactionStore;
}

export const models: RootModel = {
  accountStore,
  spinStore,
  actionsStore,
  miningStore,
  transactionStore
};
