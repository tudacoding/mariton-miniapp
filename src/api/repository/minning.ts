import config from "@/config";
import { LevelUpType } from "@/types/models/mining";
import axios from "axios";
interface IPropsStartMining {
    account: string | number,
}
interface IPropsLevelUpMining {
    type?: LevelUpType,
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
