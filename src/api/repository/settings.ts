import config from "@/config";
import axios from "axios";
import { get } from "lodash-es";
const SettingsRepository = {
    fetchSettings: async () => {
        const res = await axios.get(`${config.apiUrl}/setting-apps`);
        return get(res, "data.data.0.attributes", null)
    }
};
export default SettingsRepository;
