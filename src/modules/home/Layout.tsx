import { PropsWithChildren } from "react";
import AirNavbar from "../airdrop/AirNavbarBottom";
import AirdropActionBar from "../airdrop/AirdropActionBar";
interface IHomeLayout extends PropsWithChildren {
  classname?: string;
}
export default function HomeLayout({ children, classname }: IHomeLayout) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-col h-full mx-3">
        <div className="w-full">
          <AirdropActionBar />
        </div>
        <div className={"grow overflow-auto " + classname}>{children}</div>
        <AirNavbar />
      </div>
    </div>
  );
}
