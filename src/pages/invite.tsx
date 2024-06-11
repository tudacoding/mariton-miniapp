import HomeLayout from "@/modules/home/Layout";
import boostBody from "@/assets/air/air-body.png";
import BaseButton from "@/components/BaseButton";

export default function InvitePage() {
  return (
    <HomeLayout>
      <div className="h-full flex">
        <div className="relative grow mt-[60px]">
          <img
            className="w-full h-full absolute z-[-10]"
            src={boostBody}
            alt="bg-mission-body"
          />
          <div className="w-full h-full p-6 flex flex-col">
            <div className="text-center">
              <span className="text-t-description">Link invite</span>
            </div>
            <div className="flex flex-row gap-3">
              <div className="p-3 text-t-description bg-card rounded-xl grow"></div>
              <BaseButton>Copy</BaseButton>
            </div>
            <div>
              <div>
                <span>0.123123123</span>
                <div>icon</div>
              </div>
              <div>
                <BaseButton>Claim</BaseButton>
              </div>
            </div>
            <p>lorem ipsum dolor sit amet</p>
            <div>divider</div>
            <div>
              <BaseButton>Achievenment</BaseButton>
              <BaseButton>Friends (8)</BaseButton>
            </div>
            <div className="bg-red-100 overflow-auto grow">
              <div className="bg-blue-100 overflow-auto h-[200px] w-[200px] "></div>
              <div className="bg-blue-100 overflow-auto h-[200px] w-[200px] "></div>
              <div className="bg-blue-100 overflow-auto h-[200px] w-[200px] "></div>
              <div className="bg-blue-100 overflow-auto h-[200px] w-[200px] "></div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
