import { useNavigate } from "react-router-dom";

interface IBaseImage {
  className?: string;
  src: string;
  alt: string;
  width?: string;
  path?: string;
}

const BaseImage = (props: IBaseImage) => {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => props.path && navigate(props.path)}
      width={props.width ?? 0}
      src={props.src}
      alt={props.alt}
      className={`cursor-pointer opacity-100 active:opacity-50 ${props.className}`}
    ></img>
  );
};

export default BaseImage;
