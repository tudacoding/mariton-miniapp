import config from "@/config";
import axios from "axios";
interface IPropsStartMining {
    account: string | number,
    speed?: number,
    minedTokens?: string,
    claimTime?: string,
    lastBoostTime?: string
}

const MiningRepository = {
    startMining: async (data: IPropsStartMining) => {
        const res = await axios.post(`${config.apiUrl}/mining/start-mining`, data);
        return res.data || {};
    },
};
export default MiningRepository;
