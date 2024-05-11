import { createModel } from "@rematch/core";
import SpinRepository from "@/api/repository/spin";

import type { RootModel } from "..";
import LotteryItem from "@/types/models/lotteryItem";

interface State {
  collectedItem: LotteryItem;
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
  },
  effects: (dispatch) => ({
    async spinLottery(params) {
      const res = await SpinRepository.spinLottery(params);
      if (res) dispatch.spinStore.setCollectedItem(res);
      return res;
    },
  }),
});
export default spinStore;
