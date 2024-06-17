import WelcomePage from "@/pages/welcome";
import MainPage from "@/pages/main";
import { useGetFirstRegister } from "@/hooks/useGetFirstRegister";
import { useStartMining } from "@/hooks/useStartMining";

const IndexPage = () => {
  const { account } = useGetFirstRegister();
  useStartMining();
  return (
    <div>
      <div>{account ? <MainPage /> : <WelcomePage />}</div>
    </div>
  );
};

export default IndexPage;
