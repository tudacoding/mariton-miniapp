/* eslint-disable @typescript-eslint/no-explicit-any */
import { createModel } from "@rematch/core";
import AccountRepository from "@/api/repository/account";

import type { RootModel } from "..";
import Account from "@/types/models/account";
import SpinRepository from "@/api/repository/spin";

interface State {
  account: Account;
  inventory: Array<any>;
  pagination: any;
  currentPage: number
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
    setInventory(state, data) {
      return {
        ...state,
        inventory: data,
      };
    },
    setPagination(state, data) {
      return {
        ...state,
        pagination: data,
      };
    },
    setCurrentPage(state, data) {
      return {
        ...state,
        currentPage: data,
      };
    },
  },
  effects: (dispatch) => ({
    async getFirstRegister(params) {
      const res = await AccountRepository.getFirstRegister(params);
      if (res) dispatch.accountStore.setAccount(res);
      return res;
    },
    async getHistoryLottery(params) {
      const res = await SpinRepository.getHistoryLottery(params);
      if (res.data) dispatch.accountStore.setInventory(res.data);
      if (res.meta && res.meta.pagination)
        dispatch.accountStore.setPagination(res.meta.pagination);
      return res;
    },
  }),
});
export default accountStore;
