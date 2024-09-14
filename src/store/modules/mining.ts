import { createModel } from "@rematch/core";
import { RootModel } from "..";
import MiningRepository from "@/api/repository/minning";
import { EDailyType, IFriend, ILeaderboard, IMining, LevelUpType } from "@/types/models/mining";
import FriendRepository from "@/api/repository/friend";
import { get } from "lodash-es";
import BoostRepository from "@/api/repository/boost";
import { IBoost } from "@/types/models/account";
import TransactionResource from "@/api/repository/transaction";
interface State {
    mining: IMining,
    sending: boolean;
    friends: {
        id: number;
        attributes: IFriend;
    }[];
    countFriends: number;
    leaderboard: ILeaderboard;
    boosts: IBoost[];
}
const miningStore = createModel<RootModel>()({
    state: {
        mining: {},
        friends: [] as {
            id: number;
            attributes: IFriend;
        }[],
        sending: false,
        countFriends: 0,
        boosts: [] as IBoost[],
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
        setListBoosts(state, boosts) {
            return {
                ...state, boosts
            }
        },
        setPagenationFriends(state, friends) {
            return {
                ...state, friends: [...state.friends, ...friends]
            }
        }
    },
    effects: (dispatch) => ({
        async startMining({ id }) {
            const res = await MiningRepository.startMining({
                account: id,
            })
            if (res.id) {
                dispatch.miningStore.setMining(res)
                return res
            }
        },
        async claimTokens(_, rootState) {
            const { setMining, setSending } = dispatch.miningStore
            setSending(true)
            const mining = rootState.miningStore.mining
            if (mining.id) {
                const res: IMining = await MiningRepository.claimTokens(mining.id)
                dispatch.accountStore.setTokensWallet({ mrtTokens: res.account.mrtTokens })
                setMining(res)
            }
            setSending(false)
        },
        async claimRefTokens(_, rootState) {
            const mining = rootState.miningStore.mining
            if (mining.id) {
                const res = await MiningRepository.claimRefTokens(mining.id)
                dispatch.accountStore.setTokensWallet({ mrtTokens: res.account.mrtTokens })
                dispatch.miningStore.setMining(res)
            }
        },
        async levelUpMining({ type }: { type: LevelUpType }, rootState) {
            const mining = rootState.miningStore.mining
            if (mining.id) {
                const res = await MiningRepository.levelUpMining(mining.id, {
                    type
                })
                if (res.id) {
                    dispatch.miningStore.setMining(res)
                    dispatch.accountStore.setTokensWallet({
                        tonTokens: res.account.tonTokens,
                        mrtTokens: res.account.mrtTokens,
                    })
                }
                return res
            }
        },
        async getFriends(_, rootState) {
            const account = rootState.accountStore.account
            if (!account?.telegramUserId) return;
            const res = await FriendRepository.fetchFriends({ userId: account.telegramUserId })
            if (res.data) {
                dispatch.miningStore.setFriends({
                    friends: res.data,
                    countFriends: get(res, "meta.pagination.total")
                })
            }
        },
        async paginationFriends(data, rootState) {
            const account = rootState.accountStore.account
            if (!account?.telegramUserId) return;
            const res = await FriendRepository.fetchFriends({
                ...data,
                userId: account.telegramUserId
            })
            if (res.data) {
                dispatch.miningStore.setPagenationFriends(res.data)
                return res.data
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
            const res = await TransactionResource.signSignature({ wallet: account.wallet, tokens: amount })
            if (res.id) {
                dispatch.accountStore.setTokensWallet({
                    mrtTokens: res.account.mrtTokens,
                })
                return res
            }
        },
        async getLeaderboard() {
            const res = await MiningRepository.getLeaderboard()
            dispatch.miningStore.setLeaderboard(res)
        },
        boostDaily: async ({ userId, type }: { userId: number, type: EDailyType }) => {
            let res = await BoostRepository.boostCheckIn(userId, type)
            if (res.id) {
                await dispatch.miningStore.fetchBoosts(userId)
                return res
            }
        },
        boostOneTime: async ({ userId, type }: { userId: number, type: EDailyType }) => {
            let res = await BoostRepository.oneTimeMission({ userId, type })
            if (res.id) {
                await dispatch.miningStore.fetchBoosts(userId)
                return res
            }
        },
        fetchBoosts: async (account: number) => {
            if (!account) return;
            const res = await BoostRepository.fetchActiveBoosts(account);
            if (res?.length) {
                dispatch.miningStore.setListBoosts(res)
                return res;
            }
        },
        checkingBoost: async (data: { type: EDailyType, bonusSpeed: number, isActive: boolean }, rootState) => {
            if (!rootState.accountStore.account.id) return;
            const res = await BoostRepository.checkingBoost({
                ...data,
                account: rootState.accountStore.account.id
            });
            return res;
        }

    })
})
export default miningStore;