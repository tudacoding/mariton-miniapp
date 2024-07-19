import config from "@/config";
import axios from "axios";
import qs from "qs";
const BoostRepository = {
    boostCheckIn: async (account: number, type: 'CHECKIN' | 'JUNIOR_RICH_MARITON' | 'UPDATE_TWITTER') => {
        const res = await axios.post(`${config.apiUrl}/daily/daily-boost`, { account, type });
        return res.data || {};
    },
    fetchBoosts: async (account: number) => {
        const query = qs.stringify({
            filters: {
                account: {
                    $eq: account,
                },
            },
        }, {
            encodeValuesOnly: true,
        })
        const res = await axios.get(`${config.apiUrl}/dailys?${query}`);
        return res.data || {};
    }
};
export default BoostRepository;
