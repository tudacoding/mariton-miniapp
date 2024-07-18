import { PropsWithChildren } from "react";
import AirNavbar from "../airdrop/AirNavbarBottom";
import AirdropActionBar from "../airdrop/AirdropActionBar";
import { useLocation } from "react-router-dom";
import HomeNavbar from "./NavbarBottom";
import land from "@/assets/game/land.png";

interface IHomeLayout extends PropsWithChildren {
  classname?: string;
  hideBottom?: boolean;
  hideTop?: boolean;
}
export default function HomeLayout({
  children,
  classname,
  hideBottom = false,
  hideTop = false,
}: IHomeLayout) {
  const location = useLocation();

  return (
    <div className="h-screen w-screen overflow-hidden">
      {location?.pathname === "/" && (
        <div className="absolute inset-0 z-[-100]">
          <img
            src={land}
            alt="land"
            className="object-cover w-full h-full z-[-100]"
          />
        </div>
      )}
      <div className="flex flex-col h-full mx-3">
        {!hideTop && (
          <div className="w-full">
            <AirdropActionBar />
          </div>
        )}
        <div className={"grow overflow-auto " + classname}>{children}</div>
        {!hideBottom &&
          (location?.pathname === "/" ? <HomeNavbar /> : <AirNavbar />)}
      </div>
    </div>
  );
}
