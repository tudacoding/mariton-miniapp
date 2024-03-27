import logo from "./assets/mario-8bit.png";
import { TonConnectButton } from "@tonconnect/ui-react";
import "./App.css";
import "@twa-dev/sdk";
import StartButton from "./modules/home/StartButton";

function App() {
  return (
    <>
      <div className="p-4 flex justify-center">
        <div>Welcome to Mariton</div>
      </div>
      <img width={"100%"} src={logo} className="logo react" alt="React logo" />
      <div className="p-4 flex justify-center flex-col items-center">
        <TonConnectButton />
        <div className="mt-4">
          <StartButton />
        </div>
      </div>
    </>
  );
}

export default App;
