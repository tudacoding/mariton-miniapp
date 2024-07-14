import { createModel } from "@rematch/core";
import { RootModel } from "..";
import MiningRepository from "@/api/repository/minning";
import { IFriend, ILeaderboard, IMining, LevelUpType } from "@/types/models/mining";
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
    leaderboard: ILeaderboard;
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
        setLeaderboard(state, leaderboard) {
            return {
                ...state, leaderboard
            }
        },
    },
    effects: (dispatch) => ({
        async startMining({ id }) {
            const res = await MiningRepository.startMining({
                account: id,
            })
            dispatch.miningStore.setMining(res)
            return res
        },
        async claimTokens(_, rootState) {
            const { setMining, setSending } = dispatch.miningStore
            setSending(true)
            const mining = rootState.miningStore.mining
            if (mining.id) {
                const res: IMining = await MiningRepository.claimTokens(mining.id)
                dispatch.accountStore.setTokensWallet({
                    mrtTokens: res.account.mrtTokens,
                    totalMrtTokensClaimed: res.account.totalMrtTokensClaimed,
                })
                setMining(res)
            }
            setSending(false)
        },
        async claimRefTokens(_, rootState) {
            const mining = rootState.miningStore.mining
            if (mining.id) {
                const res = await MiningRepository.claimRefTokens(mining.id)
                dispatch.accountStore.setTokensWallet({
                    mrtTokens: res.account.mrtTokens,
                    totalMrtTokensClaimed: res.account.totalMrtTokensClaimed,
                })
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
            const account = rootState.accountStore.account
            if (!account.telegramUserId) return;
            const res = await FriendRepository.fetchFriends(account.telegramUserId)
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
        },
        async signSignature({ amount }, rootState) {
            const { account } = rootState.accountStore
            const res = await MiningRepository.signSignature({ wallet: account.wallet, tokens: amount })
            dispatch.accountStore.setTokensWallet({
                mrtTokens: res.account.mrtTokens,
            })
            return res
        },
        async getLeaderboard() {
            const res = await MiningRepository.getLeaderboard()
            dispatch.miningStore.setLeaderboard(res)
        }

    })
})
export default miningStore;