/* eslint-disable @typescript-eslint/no-explicit-any */
import { createModel } from "@rematch/core";
import AccountRepository from "@/api/repository/account";

import type { RootModel } from "..";
import Account, { ITokensWallet } from "@/types/models/account";
import SpinRepository from "@/api/repository/spin";
import { get } from "lodash-es";
import DepositRepository from "@/api/repository/deposit";
import { toast } from "react-toastify";

interface State {
  account: Account;
  inventory: Array<any>;
  pagination: any;
  currentPage: number;
  countRef: number;
  listMissions: Array<any>;
  tokensWallet: ITokensWallet;
}
const accountStore = createModel<RootModel>()({
  state: {
    countRef: 0,
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
    setMissions(state, data) {
      return {
        ...state,
        listMissions: data,
      };
    },
    setTokensWallet(state, data: ITokensWallet) {
      return {
        ...state,
        tokensWallet: { ...state.tokensWallet, ...data },
      }
    }
  },
  effects: (dispatch) => ({
    async getFirstRegister(params) {
      const res = await AccountRepository.getFirstRegister(params);
      if (res.id) {
        dispatch.accountStore.setAccount(res);
        dispatch.accountStore.setTokensWallet({
          tonTokens: res.tonTokens,
          mrtTokens: res.mrtTokens
        });
        return res;
      }
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
      return res;
    },
    async getRef(params) {
      const res = await AccountRepository.getRef(params);
      const listMissions = await AccountRepository.getMissionsOfAccount({
        address: params.address,
      });
      dispatch.accountStore.setMissions(listMissions.data);
      dispatch.accountStore.setCountRef(get(res, "meta.pagination.total"));
      return get(res, "meta.pagination.total");
    },
    async createTransaction({ type, amount }, rootState) {
      const account = rootState.accountStore.account;
      if (account?.id) {
        const res = await DepositRepository.createTransaction({
          wallet: account.wallet,
          publicKey: account.publicKey,
          type,
          amount
        });
        if (res.id) return res
      }
    },
    async getStatusTransaction({ id }, rootState) {
      const account = rootState.accountStore.account;
      if (account?.id) {
        const accountId = account?.id
        const interval = setInterval(async () => {
          const res = await DepositRepository.getStatusTransaction(id);
          if (res && res.data.attributes?.status === 'success') {
            const account = await AccountRepository.getAccount({ id: accountId });
            if (account) {
              dispatch.accountStore.setAccount(account.data?.attributes);
              dispatch.accountStore.setTokensWallet({
                tonTokens: account.data?.attributes.tonTokens,
                mrtTokens: account.data?.attributes.mrtTokens,
              })
            }
            clearInterval(interval);
            toast.success('Successful transaction!');
          }
        }, 5000)
      }

    }
  }),
});
export default accountStore;
