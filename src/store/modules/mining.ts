import { createModel } from "@rematch/core";
import { RootModel } from "..";
import MiningRepository from "@/api/repository/minning";
import { IMining, LevelUpType } from "@/types/models/mining";
interface State {
    mining: IMining,
    sending: boolean;
}
const miningStore = createModel<RootModel>()({
    state: {
        mining: {},
        sending: false
    } as State,
    reducers: {
        setMining(state, mining) {
            return { ...state, mining }
        },
        setSending(state, sending) {
            return { ...state, sending }
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
        async claimTokens(_, rootState) {
            const { setMining, setSending } = dispatch.miningStore
            setSending(true)
            const mining = rootState.miningStore.mining
            if (mining.id) {
                const res = await MiningRepository.claimTokens(mining.id)
                setMining(res)
            }
            setSending(false)
        },
        async claimRefTokens(_, rootState) {
            const mining = rootState.miningStore.mining
            if (mining.id) {
                const res = await MiningRepository.claimRefTokens(mining.id)
                dispatch.miningStore.setMining(res)
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