import ComingSoon from "@/modules/airdrop/ComingSoon";
import comingSoonLogo from "@/assets/air/air-coming-soon.png";
import HomeLayout from "@/modules/home/Layout";

const AirdropPage = () => {
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-full">
        <ComingSoon
          imageSrc={comingSoonLogo}
          title="Airdrop"
          description="Airdrop feature coming soon"
        />
      </div>
    </HomeLayout>
  );
};

export default AirdropPage;
