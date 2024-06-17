import { createModel } from "@rematch/core";
import { RootModel } from "..";
import MiningRepository from "@/api/repository/minning";
import { IMining } from "@/types/models/mining";
interface State {
    mining: IMining
}
const miningStore = createModel<RootModel>()({
    state: {
        mining: {}
    } as State,
    reducers: {
        setMining(state, mining) {
            return { ...state, mining }
        }
    },
    effects: (dispatch) => ({
        async startMining(accountId) {
            const res = await MiningRepository.startMining({
                account: accountId
            })
            dispatch.miningStore.setMining(res)
            return res
        }
    })
})
export default miningStore;