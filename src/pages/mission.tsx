import ActionBar from "@/modules/home/ActionBar";
import missionHeader from "@/assets/game/mission-header.png";
import missionBody from "@/assets/game/mission-body.png";
import logoX from "@/assets/game/logo-x.png";
import logoTelegram from "@/assets/game/telegram-logo.png";
import config from "@/config";
import { useGetFirstRegister } from "@/hooks/useGetFirstRegister";
import useCopy from "@/hooks/useCopy";
import { toast } from "react-toastify";
import ActionButton from "@/modules/mission/ActionButton";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";

const MissionScreen = () => {
  const { account } = useGetFirstRegister();
  const [copy] = useCopy(account ? `${config.botTele}${account.ref}` : "");
  const { accountStore } = useDispatch<Dispatch>();
  return (
    <div className="relative h-screen">
      <ActionBar />
      <div className="relative flex flex-col items-center justify-center w-full p-4">
        <img
          className="absolute top-0 z-10"
          src={missionHeader}
          alt="bg-mission-header"
        />
        <div className="absolute top-10 relative w-full">
          <img
            className="absolute w-full"
            src={missionBody}
            alt="bg-mission-body"
          />
          <div className="w-full absolute p-6 mt-2">
            <div className="w-full h-full bg-amber-100 rounded-xl p-4">
              <ActionButton
                logo={logoX}
                title="Follow Mariton"
                description="Click & follow on X"
                textButton="Follow"
                currentStep={account && account.currentStep}
                index={1}
                onClick={async () => {
                  window.open(config.twitter, "_blank");
                  await accountStore.completeMission({
                    address: account.wallet,
                    publicKey: account.publicKey,
                    step: 1,
                  });
                }}
                isEnable
              />
              <ActionButton
                currentStep={account && account.currentStep}
                index={2}
                logo={logoX}
                title="Like Mariton"
                description="Click & like on X"
                textButton="Follow"
                onClick={async () => {
                  window.open(config.likePost, "_blank");
                  await accountStore.completeMission({
                    address: account.wallet,
                    publicKey: account.publicKey,
                    step: 2,
                  });
                }}
                isEnable={account && account.currentStep > 0}
              />
              <ActionButton
                currentStep={account && account.currentStep}
                index={3}
                logo={logoX}
                title="Retweet X"
                description="Click & retweet"
                textButton="Retweet"
                onClick={async () => {
                  window.open(config.retweet, "_blank");
                  await accountStore.completeMission({
                    address: account.wallet,
                    publicKey: account.publicKey,
                    step: 3,
                  });
                }}
                isEnable={account && account.currentStep > 1}
              />
              <ActionButton
                currentStep={account && account.currentStep}
                index={4}
                logo={logoTelegram}
                title="Mariton Channel"
                description="Join channel"
                textButton="Join"
                onClick={async () => {
                  window.open(config.annoucementTelegram, "_blank");
                  await accountStore.completeMission({
                    address: account.wallet,
                    publicKey: account.publicKey,
                    step: 4,
                  });
                }}
                isEnable={account && account.currentStep > 2}
              />
              <ActionButton
                currentStep={account && account.currentStep}
                index={5}
                logo={logoTelegram}
                title="Join Mariton Chat"
                description="Join Chat"
                textButton="Join"
                onClick={async () => {
                  window.open(config.telegram, "_blank");
                  await accountStore.completeMission({
                    address: account.wallet,
                    publicKey: account.publicKey,
                    step: 5,
                  });
                }}
                isEnable={account && account.currentStep > 3}
              />
              <ActionButton
                currentStep={account && account.currentStep}
                index={6}
                noMargin
                logo={logoTelegram}
                title="Invite Friend"
                description={`${account ? account.ref : ""}`}
                textButton="Copy"
                onClick={async () => {
                  copy();
                  toast.success("Completed & Copy link ref sucessfully!");
                  await accountStore.completeMission({
                    address: account.wallet,
                    publicKey: account.publicKey,
                    step: 6,
                  });
                }}
                isEnable={account && account.currentStep > 4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionScreen;
