import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { ReactElement } from "react";
import { delay } from "@/helpers";
interface State {
    childrenDialog?: ReactElement | null,
    classWrapperDialog?: string,
    classDialog?: string,
    showBackgroundDialog: boolean,
    isVisibleSplash?: boolean
}
interface IDialogProp {
    children?: ReactElement, isVisible?: boolean, classWrapperDialog?: string, classDialog?: string, showBackgroundDialog?: boolean
}
const actionsStore = createModel<RootModel>()({
    state: {
        childrenDialog: null,
        classWrapperDialog: '',
        classDialog: '',
        isVisibleSplash: false,
        isVisible: false,
        showBackgroundDialog: true
    } as State,
    reducers: {
        handleDialog(state, data: IDialogProp) {
            const dialog = document.getElementById("base_dialog") as HTMLDialogElement
            if (data.isVisible) {
                dialog?.showModal()
                const { children, ...rest } = data
                return {
                    ...state,
                    ...rest,
                    childrenDialog: data.children ?? null,
                }
            }
            dialog.close()
            return state
        },
        closeDialog(state, data: IDialogProp) {
            const dialog = document.getElementById("base_dialog") as HTMLDialogElement
            dialog.close()
            return { ...state, childrenDialog: data.children ?? null, classWrapperDialog: data.classWrapperDialog ?? "", classDialog: data.classDialog ?? "", isVisible: false }
        },
        setSplashPopup(state, isVisibleSplash) {
            return { ...state, isVisibleSplash }
        },
    },
    effects: () => ({
        async openSplashPopup() {
            const dialog = document.getElementById("splash_dialog") as HTMLDialogElement
            dialog.showModal()
            await delay(2000)
            dialog.close()
        }
    })
})
export default actionsStore;