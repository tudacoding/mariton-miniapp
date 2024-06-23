import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { ReactElement } from "react";
interface State {
    childrenDialog?: ReactElement | null,
    classWrapperDialog?: string,
    classDialog?: string
}
interface IDialogProp {
    children?: ReactElement, isVisible?: boolean, classWrapperDialog?: string, classDialog?: string
}
const actionsStore = createModel<RootModel>()({
    state: {
        childrenDialog: null,
        classWrapperDialog: '',
        classDialog: ''
    } as State,
    reducers: {
        handleDialog(state, data: IDialogProp) {
            const dialog = document.getElementById("base_dialog") as HTMLDialogElement
            if (data.isVisible) {
                dialog?.showModal()
                return { ...state, childrenDialog: data.children ?? null, classWrapperDialog: data.classWrapperDialog ?? "", classDialog: data.classDialog ?? "" }
            }
            dialog.close()
            return state
        },
        closeDialog(state, data: IDialogProp) {
            const dialog = document.getElementById("base_dialog") as HTMLDialogElement
            dialog.close()
            return { ...state, childrenDialog: data.children ?? null, classWrapperDialog: data.classWrapperDialog ?? "", classDialog: data.classDialog ?? "", isVisible: false }
        }
    }
})
export default actionsStore;