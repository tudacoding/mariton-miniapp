import "./App.css";
import "@twa-dev/sdk";
import WelcomePage from "@/pages/WelcomePage";
import { useTonWallet } from "@tonconnect/ui-react";
import MainPage from "@/pages/MainPage";

function App() {
  const wallet = useTonWallet();
  console.log("connected", wallet);
  return (
    <>
      <div>{wallet ? <MainPage /> : <WelcomePage />}</div>
    </>
  );
}

export default App;
