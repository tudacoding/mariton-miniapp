/* eslint-disable @typescript-eslint/no-explicit-any */
import { createModel } from "@rematch/core";
import AccountRepository from "@/api/repository/account";

import type { RootModel } from "..";
import Account from "@/types/models/account";
import SpinRepository from "@/api/repository/spin";
import { get } from "lodash-es";

interface State {
  account: Account;
  inventory: Array<any>;
  pagination: any;
  currentPage: number;
  countRef: number;
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
    setCountRef(state, data) {
      return {
        ...state,
        countRef: data,
      };
    },
  },
  effects: (dispatch) => ({
    async getFirstRegister(params) {
      const res = await AccountRepository.getFirstRegister(params);
      if (res) dispatch.accountStore.setAccount(res);
      return res;
    },
    async completeMission(params) {
      setTimeout(async () => {
        const res = await AccountRepository.completeMission(params);
        if (res) dispatch.accountStore.setAccount(res);
        return res;
      }, 2 * 60000);
    },
    async getHistoryLottery(params) {
      const res = await SpinRepository.getHistoryLottery(params);
      if (res.data) dispatch.accountStore.setInventory(res.data);
      if (res.meta && res.meta.pagination)
        dispatch.accountStore.setPagination(res.meta.pagination);
      return res;
    },
    async getRef(params) {
      const res = await AccountRepository.getRef(params);
      dispatch.accountStore.setCountRef(get(res, "meta.pagination.total"));
      return get(res, "meta.pagination.total");
    },
  }),
});
export default accountStore;
