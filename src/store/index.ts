import type { Models } from "@rematch/core";

import accountStore from "./modules/account";

export interface RootModel extends Models<RootModel> {
  accountStore: typeof accountStore;
}

export const models: RootModel = {
  accountStore,
};
