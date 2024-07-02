import BaseCard from "@/components/BaseCard";
import boostLogo from "@/assets/air/air-logo-friend.png";
import Success from "@/assets/icons/Success";

export default function ListAchievenments() {
  const achievenments = [
    {
      title: "1 Friend",
      description: "Active Offline Mining",
      onClick: () => {},
      icon: "",
      selected: true,
    },
    {
      title: "3 Friends",
      description: "+1% lifetime mining speed",
      onClick: () => {},
      icon: "",
      selected: true,
    },
    {
      title: "5 Friends",
      description: "+3% lifetime mining speed",
      onClick: () => {},
      icon: "",
      selected: true,
    },
    {
      title: "10 Friends",
      description: "+5% lifetime mining speed",
      onClick: () => {},
      icon: "",
      selected: false,
    },
    {
      title: "20 Friends",
      description: "+10% lifetime mining speed",
      onClick: () => {},
      icon: "",
      selected: false,
    },
    {
      title: "50 Friends",
      description: "+15% lifetime mining speed",
      onClick: () => {},
      icon: "",
      selected: false,
    },
    {
      title: "100 Friends",
      description: "+20% lifetime mining speed",
      onClick: () => {},
      icon: "",
      selected: false,
    },
  ];
  return (
    <div>
      {achievenments.map(({ description, onClick, title, selected }, index) => {
        return (
          <div key={index} className="pb-3">
            <BaseCard
              avatar={boostLogo}
              title={title}
              description={description}
              onClick={onClick}
              actionComponent={
                selected ? (
                  <div className="h-6 w-6">
                    <Success />
                  </div>
                ) : (
                  <div className="border border-0.5 border-solid rounded-full h-6 w-6 border-t-description"></div>
                )
              }
            ></BaseCard>
          </div>
        );
      })}
    </div>
  );
}
