import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

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
    "#FFD700",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
}
export default function BaseAvatar({
  name,
  children,
}: {
  name?: string;
  children: React.ReactNode;
  visibleBorderAvatar?: boolean;
}) {
  const formatName = useMemo(() => {
    if (children)
      return {
        children: children,
        background: getRandomColor(),
      };
    if (!name) return { name: "", background: "" };
    return {
      children: formatNameToInitials(name),
      background: getRandomColor(),
    };
  }, [name]);

  return (
    <div
      style={{ backgroundColor: formatName.background }}
      className={twMerge(
        "flex-none h-10 w-10 rounded-full overflow-hidden flex justify-center items-center border-2 border-solid border-primary"
      )}
    >
      {formatName.children}
    </div>
  );
}
