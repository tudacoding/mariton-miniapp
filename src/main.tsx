import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl="https://ton-blockchain-hello-world.vercel.app/tonconnect-manifest.json">
    <App />
  </TonConnectUIProvider>
);
