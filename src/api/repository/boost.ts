import config from "@/config";
import axios from "axios";
const BoostRepository = {
    boostCheckIn: async (account: number, type: 'CHECKIN' | 'JUNIOR_RICH_MARITON' | 'MARITON_AMBASSADOR') => {
        const res = await axios.post(`${config.apiUrl}/daily/daily-boost`, { account, type });
        return res.data || {};
    },
    fetchActiveBoosts: async (account: number) => {
        const res = await axios.get(`${config.apiUrl}/daily/active-boost/${account}`);
        return res.data || [];
    }
};
export default BoostRepository;
