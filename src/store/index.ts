import type { Models } from "@rematch/core";

import accountStore from "./modules/account";
import spinStore from "./modules/spin";
import actionsStore from "./modules/actions";

export interface RootModel extends Models<RootModel> {
  accountStore: typeof accountStore;
  spinStore: typeof spinStore;
  actionsStore: typeof actionsStore;
}

export const models: RootModel = {
  accountStore,
  spinStore,
  actionsStore
};
