import { PropsWithChildren } from "react";
import AirNavbar from "../airdrop/AirNavbarBottom";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen">
      <AirNavbar />
      <div className="mx-3 flex justify-center items-center h-full">{children}</div>
    </div>
  );
}
