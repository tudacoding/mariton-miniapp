import config from "@/config";
import { LevelUpType } from "@/types/models/mining";
import axios from "axios";
interface IPropsStartMining {
    account: string | number
}
interface IPropsLevelUpMining {
    type?: LevelUpType,
}
const MiningRepository = {
    startMining: async (data: IPropsStartMining) => {
        const res = await axios.post(`${config.apiUrl}/mining/start-mining`, data);
        return res.data || {};
    },
    endMining: async (id: number) => {
        const res = await axios.put(`${config.apiUrl}/mining/end-mining/${id}`);
        return res.data || {};
    },
    claimTokens: async (id: number) => {
        const res = await axios.put(`${config.apiUrl}/mining/claim-tokens/${id}`)
        return res.data || {}
    },
    claimRefTokens: async (id: number) => {
        const res = await axios.put(`${config.apiUrl}/mining/claim-tokens-from-friends/${id}`)
        return res.data || {}
    },
    levelUpMining: async (id: number, data: IPropsLevelUpMining) => {
        const res = await axios.put(`${config.apiUrl}/mining/level-up/${id}`, data)
        return res.data || {}
    },
    completeMissionFriend: async (id: number, data: any) => {
        const res = await axios.put(`${config.apiUrl}/mining/complete-mission-friend/${id}`, data)
        return res.data || {}
    },
    signSignature: async (data: any) => {
        const res = await axios.post(`${config.apiUrl}/mining/sign-signature`, data);
        return res.data || {};
    },
    getLeaderboard: async () => {
        const res = await axios.get(`${config.apiUrl}/mining/leaderboard`);
        return res.data || {};
    }
};
export default MiningRepository;
