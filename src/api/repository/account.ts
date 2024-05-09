import config from "@/config";
import axios from "axios";

interface IProps {
  address: string;
  publicKey: string;
}

const AccountRepository = {
  getFirstRegister: async ({ address, publicKey }: IProps) => {
    const res = await axios.post(`${config.apiUrl}/game/first-register`, {
      address,
      publicKey,
    });
    return res.data || {};
  },
};
export default AccountRepository;
