import WelcomePage from "@/pages/welcome";
import MainPage from "@/pages/main";
import { useGetFirstRegister } from "@/hooks/useGetFirstRegister";

const IndexPage = () => {
  const { account } = useGetFirstRegister();
  return (
    <div>
      <div>{account ? <MainPage /> : <WelcomePage />}</div>
    </div>
  );
};

export default IndexPage;
