import { createModel } from "@rematch/core";
import { RootModel } from "..";
import MiningRepository from "@/api/repository/minning";
import { IMining, LevelUpType } from "@/types/models/mining";
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
        },
        async claimToken(_, rootState) {
            const mining = rootState.miningStore.mining
            if (mining.id) {
                const res = await MiningRepository.claimToken(mining.id)
                dispatch.miningStore.setMining(res)
                return res
            }
        },
        async levelUpMining({ type }: { type: LevelUpType }, rootState) {
            const mining = rootState.miningStore.mining
            if (mining.id) {
                const res = await MiningRepository.levelUpMining(mining.id, {
                    type
                })
                dispatch.miningStore.setMining(res)
                return res
            }
        }
    })
})
export default miningStore;