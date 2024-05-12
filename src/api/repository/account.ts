import config from "@/config";
import axios from "axios";

interface IProps {
  address: string;
  publicKey: string;
  step?: number;
}

const AccountRepository = {
  getFirstRegister: async ({ address, publicKey }: IProps) => {
    const res = await axios.post(`${config.apiUrl}/game/first-register`, {
      address,
      publicKey,
    });
    return res.data || {};
  },
  completeMission: async ({ address, publicKey, step }: IProps) => {
    const res = await axios.post(`${config.apiUrl}/game/complete-mission`, {
      address,
      publicKey,
      step,
    });
    return res.data || {};
  },
};
export default AccountRepository;
