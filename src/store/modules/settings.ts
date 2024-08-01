import { createModel } from "@rematch/core";
import { RootModel } from "..";
import SettingsRepository from "@/api/repository/settings";
import { ISettingApp } from "@/types/models/account";
interface State {
    settings: ISettingApp
}
const settingsStore = createModel<RootModel>()({
    state: {
        settings: {}
    } as State,
    reducers: {
        setSettings(state, settings) {
            return { ...state, settings }
        },
    },
    effects: (dispatch) => ({
        fetchSettingApp: async () => {
            const res = await SettingsRepository.fetchSettings();
            if (res) dispatch.settingsStore.setSettings(res)
            return res
        }
    })
})
export default settingsStore;