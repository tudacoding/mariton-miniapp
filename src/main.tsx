import ReactDOM from "react-dom/client";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import listRouters from "./router";

const router = createBrowserRouter(listRouters);

// this manifest is used temporarily for development purposes
const manifestUrl =
  "https://ton-blockchain-hello-world.vercel.app/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <RouterProvider router={router} />
  </TonConnectUIProvider>
);
