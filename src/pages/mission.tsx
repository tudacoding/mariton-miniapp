import ActionBar from "@/modules/home/ActionBar";
import missionBackground from "@/assets/game/mission-bg.png";
import closeBigButton from "@/assets/game/close-big-button.png";
import logoX from "@/assets/game/logo-x.png";
import logoTelegram from "@/assets/game/telegram-logo.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

interface IProps {
  title: string;
  description: string;
  textButton: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any;
  isEnable?: boolean;
  logo: string;
}

const ActionButton = (props: IProps) => {
  const [check, setCheck] = useState(false);
  return (
    <div className="bg-amber-200 text-slate-800 flex justify-between p-4 mb-4 rounded-xl items-center">
      <div className="flex">
        <img className="h-12 w-12 mr-4" src={props.logo}></img>
        <div>
          <div className="font-bold text-amber-800">{props.title}</div>
          <div>{props.description}</div>
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
  return (
    <div className="relative h-screen">
      <ActionBar />
      <div className="relative flex justify-center items-center w-full">
        <div className="w-9/12 absolute top-1/5 ">
          <div className="w-full h-full bg-amber-100 rounded-xl p-4">
            <ActionButton
              logo={logoX}
              title="Follow Mariton on X"
              description="Lorem Ipsum"
              textButton="Follow"
              onClick={() => {
                window.open("https://twitter.com/Mariton_game", "_blank");
                setStep(2);
              }}
              isEnable
            />
            <ActionButton
              logo={logoX}
              title="Like Mariton on X"
              description="Lorem Ipsum"
              textButton="Follow"
              onClick={() => {
                window.open("https://twitter.com/Mariton_game", "_blank");
                setStep(3);
              }}
              isEnable={step > 1}
            />
            <ActionButton
              logo={logoX}
              title="Retweet X"
              description="Lorem Ipsum"
              textButton="Retweet"
              onClick={() => {
                window.open("https://twitter.com/Mariton_game", "_blank");
                setStep(4);
              }}
              isEnable={step > 2}
            />
            <ActionButton
              logo={logoTelegram}
              title="Follow annoucement"
              description="Lorem Ipsum"
              textButton="Join"
              onClick={() => {
                setStep(5);
              }}
              isEnable={step > 3}
            />
            <ActionButton
              logo={logoTelegram}
              title="Join Mariton Chat"
              description="Lorem Ipsum"
              textButton="Join"
              onClick={() => {
                window.open("https://t.me/Mariton_Chat", "_blank");
                setStep(6);
              }}
              isEnable={step > 4}
            />
            <ActionButton
              logo={logoTelegram}
              title="Invite Friend"
              description="XKOISOD"
              textButton="Copy"
              onClick={() => {
                setStep(7);
              }}
              isEnable={step > 5}
            />
          </div>
          <NavLink className="flex justify-center" to="/">
            <div className="absolute -bottom-12 w-full justify-center flex hover:opacity-40 cursor-pointer">
              <img src={closeBigButton} alt="bg-shop" />
            </div>
          </NavLink>
        </div>

        <div className="flex justify-center w-11/12">
          <img src={missionBackground} alt="bg-shop" />
        </div>
      </div>
    </div>
  );
};

export default MissionScreen;
