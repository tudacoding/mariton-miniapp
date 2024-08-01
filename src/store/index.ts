import type { Models } from "@rematch/core";

import accountStore from "./modules/account";
import spinStore from "./modules/spin";
import actionsStore from "./modules/actions";
import miningStore from "./modules/mining";
import transactionStore from "./modules/transaction";
import settingsStore from "./modules/settings";

export interface RootModel extends Models<RootModel> {
  accountStore: typeof accountStore;
  spinStore: typeof spinStore;
  actionsStore: typeof actionsStore;
  miningStore: typeof miningStore;
  transactionStore: typeof transactionStore;
  settingsStore: typeof settingsStore;
}

export const models: RootModel = {
  accountStore,
  spinStore,
  actionsStore,
  miningStore,
  transactionStore,
  settingsStore
};
