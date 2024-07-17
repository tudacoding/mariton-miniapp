import config from "@/config";
import axios from "axios";
const BoostRepository = {
    dailyCheckIn: async (account: number) => {
        const res = await axios.post(`${config.apiUrl}/daily/check-in`, { account });
        return res.data || {};
    },
    juniorRichMariton: async (account: number) => {
        const res = await axios.post(`${config.apiUrl}/daily/junior-rich-mariton`, { account });
        return res.data || {};
    },
    updateTwitter: async (account: number) => {
        const res = await axios.post(`${config.apiUrl}/daily/update-twitter`, { account });
        return res.data || {};
    },
};
export default BoostRepository;
