import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { ReactElement } from "react";
interface State {
    childrenDialog: ReactElement | null,
    classWrapperDialog?: string,
    classDialog?: string
}
const actionsStore = createModel<RootModel>()({
    state: {
        childrenDialog: null,
        classWrapperDialog: '',
        classDialog: ''
    } as State,
    reducers: {
        handleDialog(state, data: { children?: ReactElement, isVisible: boolean, classWrapperDialog?: string, classDialog?: string }) {
            const dialog = document.getElementById("base_dialog") as HTMLDialogElement
            if (data.isVisible) {
                dialog?.showModal()
                return { ...state, childrenDialog: data.children ?? null, classWrapperDialog: data.classWrapperDialog ?? "", classDialog: data.classDialog ?? "" }
            }
            dialog.close()
            return state
        }
    }
})
export default actionsStore;