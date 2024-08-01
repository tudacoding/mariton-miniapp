import "./App.css";
import "@twa-dev/sdk";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import useInitApp from "./hooks/useInitApp";
import SplashPopup from "./components/SplashPopup";
import DialogOutlet from "./components/DialogOutlet";
import { routes } from "./router";

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

function App() {
  useInitApp();
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        <SplashPopup />
        <DialogOutlet />
        <ToastContainer
          position="top-right"
          theme="light"
          autoClose={3000}
          hideProgressBar={true}
          toastClassName={"m-3 rounded-xl text-sm font-semibold-all"}
          transition={Zoom}
        />
      </Provider>
    </>
  );
}

export default App;
