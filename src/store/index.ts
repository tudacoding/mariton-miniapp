import type { Models } from "@rematch/core";

import accountStore from "./modules/account";
import spinStore from "./modules/spin";
import actionsStore from "./modules/actions";
import miningStore from "./modules/mining";

export interface RootModel extends Models<RootModel> {
  accountStore: typeof accountStore;
  spinStore: typeof spinStore;
  actionsStore: typeof actionsStore;
  miningStore: typeof miningStore;
}

export const models: RootModel = {
  accountStore,
  spinStore,
  actionsStore,
  miningStore
};
