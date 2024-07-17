import config from "@/config";
import axios from "axios";
const DepositRepository = {
    createTransaction: async (data: any) => {
        const res = await axios.post(`${config.apiUrl}/deposit/create-transaction`, data);
        return res.data || {};
    },
};
export default DepositRepository;
