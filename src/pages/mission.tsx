import ActionBar from "@/modules/home/ActionBar";
import missionHeader from "@/assets/game/mission-header.png";
import missionBody from "@/assets/game/mission-body.png";
import logoX from "@/assets/game/logo-x.png";
import logoTelegram from "@/assets/game/telegram-logo.png";
import { useState } from "react";
import config from "@/config";
import { useGetFirstRegister } from "@/hooks/useGetFirstRegister";
import useCopy from "@/hooks/useCopy";
import { toast } from "react-toastify";
interface IProps {
  title: string;
  description: string;
  textButton: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any;
  isEnable?: boolean;
  logo: string;
  noMargin?: boolean;
}

const ActionButton = (props: IProps) => {
  const [check, setCheck] = useState(false);
  return (
    <div
      className={`bg-amber-200 text-slate-800 flex justify-between p-4 ${
        !props.noMargin && "mb-4"
      } rounded-xl items-center`}
    >
      <div className="flex">
        <img className="h-8 w-8 mr-4" src={props.logo}></img>
        <div>
          <div className="font-bold text-xs text-amber-800">{props.title}</div>
          <div className="text-xs">{props.description}</div>
        </div>
      </div>
      {!props.isEnable ? (
        <button
          disabled
          className="h-10 bg-yellow-800 text-white font-bold py-1 px-4 rounded-2xl opacity-50"
        >
          +20
        </button>
      ) : !check ? (
        <button
          onClick={() => {
            props.onClick();
            setCheck(true);
          }}
          className="h-10 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-2xl"
        >
          <span>+20</span>
        </button>
      ) : (
        <div className="mr-4">✅</div>
      )}
    </div>
  );
};

const MissionScreen = () => {
  const [step, setStep] = useState(1);
  const { account } = useGetFirstRegister();
  const [copy] = useCopy(account ? `${config.botTele}${account.ref}` : "");
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
                onClick={() => {
                  window.open(config.twitter, "_blank");
                  setStep(2);
                }}
                isEnable
              />
              <ActionButton
                logo={logoX}
                title="Like Mariton"
                description="Click & like on X"
                textButton="Follow"
                onClick={() => {
                  window.open(config.likePost, "_blank");
                  setStep(3);
                }}
                isEnable={step > 1}
              />
              <ActionButton
                logo={logoX}
                title="Retweet X"
                description="Click & retweet"
                textButton="Retweet"
                onClick={() => {
                  window.open(config.retweet, "_blank");
                  setStep(4);
                }}
                isEnable={step > 2}
              />
              <ActionButton
                logo={logoTelegram}
                title="Mariton Channel"
                description="Join channel"
                textButton="Join"
                onClick={() => {
                  window.open(config.annoucementTelegram, "_blank");
                  setStep(5);
                }}
                isEnable={step > 3}
              />
              <ActionButton
                logo={logoTelegram}
                title="Join Mariton Chat"
                description="Join Chat"
                textButton="Join"
                onClick={() => {
                  window.open(config.telegram, "_blank");
                  setStep(6);
                }}
                isEnable={step > 4}
              />
              <ActionButton
                noMargin
                logo={logoTelegram}
                title="Invite Friend"
                description={`${account ? account.ref : ""}`}
                textButton="Copy"
                onClick={() => {
                  copy();
                  toast.success("Completed & Copy Sucessfully!");
                  setStep(7);
                }}
                isEnable={step > 5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionScreen;
