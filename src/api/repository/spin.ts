import config from "@/config";
import axios from "axios";

interface IProps {
  address: string;
  publicKey: string;
}

const SpinRepository = {
  spinLottery: async ({ address, publicKey }: IProps) => {
    const res = await axios.post(`${config.apiUrl}/game/spin-lottery`, {
      address,
      publicKey,
    });
    return res.data || {};
  },
  getHistoryLottery: async () => {
    // const res = await axios.post(`${config.apiUrl}/`, {
    //   address,
    //   publicKey,
    // });
    // return res.data || {};
  },
};
export default SpinRepository;
