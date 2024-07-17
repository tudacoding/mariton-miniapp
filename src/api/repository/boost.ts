import config from "@/config";
import axios from "axios";
const BoostRepository = {
    boostCheckIn: async (account: number, type: 'CHECKIN' | 'JUNIOR_RICH_MARITON' | 'UPDATE_TWITTER') => {
        const res = await axios.post(`${config.apiUrl}/daily/daily-boost`, { account, type });
        return res.data || {};
    },
};
export default BoostRepository;
