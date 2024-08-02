import config from "@/config";
import { EDailyType } from "@/types/models/mining";
import axios from "axios";
import qs from "qs";
const BoostRepository = {
    boostCheckIn: async (account: number, type: EDailyType) => {
        const res = await axios.post(`${config.apiUrl}/daily/daily-boost`, { account, type });
        return res.data || {};
    },
    fetchActiveBoosts: async (account: number) => {
        const res = await axios.get(`${config.apiUrl}/daily/active-boost/${account}`);
        return res.data || [];
    },
    oneTimeMission: async (
        {
            userId,
            type
        }: {
            userId: number,
            type: EDailyType
        }
    ) => {
        const res = await axios.post(`${config.apiUrl}/daily/one-time-boost`, {
            account: userId,
            type
        });
        return res.data ?? {}
    }
};
export default BoostRepository;
