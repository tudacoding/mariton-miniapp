import { createModel } from "@rematch/core";
import AccountRepository from "@/api/repository/account";

import type { RootModel } from "..";
import Account from "@/types/models/account";

interface State {
  account: Account;
}
const accountStore = createModel<RootModel>()({
  state: {} as State,
  reducers: {
    setAccount(state, data) {
      return {
        ...state,
        account: data,
      };
    },
  },
  effects: (dispatch) => ({
    async getFirstRegister(params) {
      const res = await AccountRepository.getFirstRegister(params);
      if (res) dispatch.accountStore.setAccount(res);
      return res;
    },
  }),
});
export default accountStore;
