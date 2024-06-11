import ActionBar from "@/modules/home/ActionBar";
import HomeLayout from "@/modules/home/Layout";

export default function Home() {
  return (
    <HomeLayout classname="relative !p-0">
      <ActionBar />
      <div>home</div>
    </HomeLayout>
  );
}
