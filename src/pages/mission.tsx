import ActionBar from "@/modules/home/ActionBar";
import missionHeader from "@/assets/game/mission-header.png";
import missionBody from "@/assets/game/mission-body.png";
import logoX from "@/assets/game/logo-x.png";
import logoTelegram from "@/assets/game/telegram-logo.png";
import logoAddFriend from "@/assets/game/add-friend_11261574.png";
import config from "@/config";
import { useGetFirstRegister } from "@/hooks/useGetFirstRegister";
import useCopy from "@/hooks/useCopy";
import { toast } from "react-toastify";
import ActionButton from "@/modules/mission/ActionButton";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import { useGetCountRef } from "@/hooks/useGetCountRef";

const MissionScreen = () => {
  const { account } = useGetFirstRegister();
  const [copy] = useCopy(account ? `${config.botTele}${account.ref}` : "");
  const { accountStore } = useDispatch<Dispatch>();
  const { countRef } = useGetCountRef();
  return (
    <div className="relative h-screen">
      <ActionBar />
      <div className="relative flex flex-col items-center justify-center w-full p-4 mt-[60px]">
        <img
          className="absolute top-0 z-10"
          src={missionHeader}
          alt="bg-mission-header"
        />
        <div className="top-10 relative w-full h-fit">
          <img
            className="absolute w-full z-[-10] h-full"
            src={missionBody}
            alt="bg-mission-body"
          />
          <div className="w-full p-6 mt-2">
            <div className="w-full h-full bg-amber-100 rounded-xl p-4">
              <ActionButton
                logo={logoX}
                title="Follow Mariton"
                description="Click & follow on X"
                textButton="Follow"
                completedMission={account && account.completedMission}
                index={1}
                onClick={async () => {
                  window.open(config.twitter, "_blank");
                  await accountStore.completeMission({
                    address: account.wallet,
                    publicKey: account.publicKey,
                    step: 1,
                  });
                }}
              />
              <ActionButton
                completedMission={account && account.completedMission}
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
              />
              <ActionButton
                completedMission={account && account.completedMission}
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
              />
              <ActionButton
                completedMission={account && account.completedMission}
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
              />
              <ActionButton
                completedMission={account && account.completedMission}
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
              />
              <ActionButton
                completedMission={account && account.completedMission}
                index={6}
                inviteFriend
                logo={logoAddFriend}
                title="Invite Friend"
                description={`Total refs: ${countRef}`}
                textButton="Copy"
                countRef={countRef}
                onClick={async () => {
                  copy();
                  toast.success("Completed & Copy link ref sucessfully!");
                  await accountStore.completeMission({
                    address: account.wallet,
                    publicKey: account.publicKey,
                    step: 6,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionScreen;
