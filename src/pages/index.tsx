import WelcomePage from "@/pages/welcome";
import { useTonWallet } from "@tonconnect/ui-react";
import MainPage from "@/pages/main";

const IndexPage = () => {
  const wallet = useTonWallet();
  return (
    <div>
      <div>{wallet ? <MainPage /> : <WelcomePage />}</div>
    </div>
  );
};

export default IndexPage;
