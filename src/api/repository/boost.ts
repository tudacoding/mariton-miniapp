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
    oneTimeMission: async ({ account, type, status }: { account: number, type: EDailyType, status: string }) => {
        const res = await axios.post(`${config.apiUrl}/dailies`, {
            data: {
                account, type, status
            }
        });
        return res
    },
    oneTimeMissionCheck: async (id: number) => {
        const res = await axios.get(`${config.apiUrl}/daily/ontime-mission-check/${id}`);
        return res
    }
};
export default BoostRepository;
