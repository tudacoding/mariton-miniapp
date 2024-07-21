import config from "@/config";
import axios from "axios";

const TransactionResource = {
    async getTransactionsWithWallet({ wallet }: any) {
        const res = await axios.get(`${config.apiUrl}/transaction/transaction-with-wallet?wallet=${wallet}`);
        return res.data || [];
    },
}
export default TransactionResource;