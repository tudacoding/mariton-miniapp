import type { Models } from "@rematch/core";

import accountStore from "./modules/account";
import spinStore from "./modules/spin";

export interface RootModel extends Models<RootModel> {
  accountStore: typeof accountStore;
  spinStore: typeof spinStore;
}

export const models: RootModel = {
  accountStore,
  spinStore,
};
