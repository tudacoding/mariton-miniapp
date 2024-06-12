import { PropsWithChildren } from "react";
import AirNavbar from "../airdrop/AirNavbarBottom";
interface IHomeLayout extends PropsWithChildren {
  classname?: string;
}
export default function HomeLayout({ children, classname }: IHomeLayout) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-col h-full">
        <div className={"grow mx-3 overflow-auto " + classname}>{children}</div>
        <AirNavbar />
      </div>
    </div>
  );
}
