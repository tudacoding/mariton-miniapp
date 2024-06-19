import config from "@/config";
import axios from "axios";
interface IPropsStartMining {
    account: string | number,
    speed?: number,
    minedTokens?: string,
    claimTime?: string,
    lastBoostTime?: string
}
interface IPropsLevelUpMining {
    speed?: number,
}
const MiningRepository = {
    startMining: async (data: IPropsStartMining) => {
        const res = await axios.post(`${config.apiUrl}/mining/start-mining`, data);
        return res.data || {};
    },
    claimToken: async (id: number) => {
        const res = await axios.put(`${config.apiUrl}/mining/claim-token/${id}`)
        return res.data || {}
    },
    levelUpMining: async (id: number, data: IPropsLevelUpMining) => {
        const res = await axios.put(`${config.apiUrl}/mining/level-up/${id}`, data)
        return res.data || {}
    }
};
export default MiningRepository;
