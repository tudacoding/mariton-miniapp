import config from "@/config";
import { EBoostType } from "@/types/models/mining";
import axios from "axios";
const BoostRepository = {
    boostCheckIn: async (account: number, type: EBoostType) => {
        const res = await axios.post(`${config.apiUrl}/daily/daily-boost`, { account, type });
        return res.data || {};
    },
    fetchActiveBoosts: async (account: number) => {
        const res = await axios.get(`${config.apiUrl}/daily/active-boost/${account}`);
        return res.data || [];
    }
};
export default BoostRepository;
