import { createModel } from "@rematch/core";
import { RootModel } from "..";
import MiningRepository from "@/api/repository/minning";
import { IFriend, IMining, LevelUpType } from "@/types/models/mining";
import FriendRepository from "@/api/repository/friend";
import { get } from "lodash-es";
interface State {
    mining: IMining,
    sending: boolean;
    friends: {
        id: number;
        attributes: IFriend;
    }[];
    countFriends: number;
}
const miningStore = createModel<RootModel>()({
    state: {
        mining: {},
        friends: [] as {
            id: number;
            attributes: IFriend;
        }[],
        sending: false,
        countFriends: 0
    } as State,
    reducers: {
        setMining(state, mining) {
            return { ...state, mining }
        },
        setSending(state, sending) {
            return { ...state, sending }
        },
        setFriends(state, data) {
            return { ...state, ...data }
        },
    },
    effects: (dispatch) => ({
        async startMining({ id, telegramUserId }) {
            const res = await MiningRepository.startMining({
                account: id,
                telegramUserId
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
        },
        async getFriends(_, rootState) {
            const mining = rootState.miningStore.mining
            const res = await FriendRepository.fetchFriends(mining.telegramUserId)
            if (res.data) {
                dispatch.miningStore.setFriends({
                    friends: res.data,
                    countFriends: get(res, "meta.pagination.total")
                })
            }
        },
        async completeMissionFriend({ id, data }) {
            const res = await MiningRepository.completeMissionFriend(id, data)
            if (res.id) {
                dispatch.miningStore.setMining(res)
                return res
            }
        }
    })
})
export default miningStore;