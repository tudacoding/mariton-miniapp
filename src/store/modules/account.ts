/* eslint-disable @typescript-eslint/no-explicit-any */
import { createModel } from "@rematch/core";
import AccountRepository from "@/api/repository/account";

import type { RootModel } from "..";
import Account, { IRef } from "@/types/models/account";
import SpinRepository from "@/api/repository/spin";
import { get } from "lodash-es";

interface State {
  account: Account;
  inventory: Array<any>;
  pagination: any;
  currentPage: number;
  countRef: number;
  listMissions: Array<any>;
  refs: Array<IRef>;
}
const accountStore = createModel<RootModel>()({
  state: {
    countRef: 0,
    refs: [] as IRef[]
  } as State,
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
    setRefs(state, refs) {
      return {
        ...state,
        refs,
      };
    },
    setMissions(state, data) {
      return {
        ...state,
        listMissions: data,
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
      const res = await AccountRepository.completeMission(params);
      if (res) dispatch.accountStore.setAccount(res);
      console.log(params);
      const listMissions = await AccountRepository.getMissionsOfAccount({
        address: params.address,
      });
      dispatch.accountStore.setMissions(listMissions.data);
      return res;
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
      const listMissions = await AccountRepository.getMissionsOfAccount({
        address: params.address,
      });
      dispatch.accountStore.setMissions(listMissions.data);
      dispatch.accountStore.setCountRef(get(res, "meta.pagination.total"));
      dispatch.accountStore.setRefs(res.data);
      return get(res, "meta.pagination.total");
    },
  }),
});
export default accountStore;
