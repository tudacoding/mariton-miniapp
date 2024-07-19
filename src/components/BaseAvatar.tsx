import { useMemo } from "react";

function formatNameToInitials(name: string) {
  const parts = name.split(/[\s\W]+/);

  const firstPart = parts[0];
  const initials = firstPart.substring(0, 2).toUpperCase();

  return initials;
}
function getRandomColor() {
  const colors = [
    "#FF5733", // Red-Orange
        "#FF6F61", // Coral
        "#FF8C00", // Dark Orange
        "#F4A460", // Sandy Brown
        "#FFD700"  
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
}
export default function BaseAvatar({ name }: { name?: string }) {
  const formatName = useMemo(() => {
    if (!name) return { name: "", background: "" };
    return {
      name: formatNameToInitials(name),
      background: getRandomColor(),
    };
  }, [name]);

  return (
    <div
      style={{ backgroundColor: formatName.background }}
      className="flex-none h-10 w-10 border-2 border-solid border-primary rounded-full overflow-hidden flex justify-center items-center"
    >
      {formatName.name}
    </div>
  );
}
