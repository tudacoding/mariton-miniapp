import { createModel } from "@rematch/core";
import SpinRepository from "@/api/repository/spin";

import type { RootModel } from "..";
import LotteryItem from "@/types/models/lotteryItem";

interface State {
  collectedItem: LotteryItem;
  isOpenDialog: boolean;
}
const spinStore = createModel<RootModel>()({
  state: {} as State,
  reducers: {
    setCollectedItem(state, data) {
      return {
        ...state,
        collectedItem: data,
      };
    },
    setIsOpenDialog(state, data) {
      return {
        ...state,
        isOpenDialog: data,
      };
    },
  },
  effects: (dispatch) => ({
    async spinLottery(params, rootState) {
      const res = await SpinRepository.spinLottery(params);
      if (res) {
        console.log(res);
        const account = rootState.accountStore.account;
        dispatch.accountStore.setAccount({
          ...account,
          usedSpins: account.usedSpins + 1
        })
        dispatch.spinStore.setCollectedItem(res);
        return res;
      }
    },
  }),
});
export default spinStore;
