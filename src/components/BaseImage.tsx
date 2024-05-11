import { useNavigate } from "react-router-dom";

interface IBaseImage {
  className?: string;
  src: string;
  alt: string;
  width: string;
  path?: string;
}

const BaseImage = (props: IBaseImage) => {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => props.path && navigate(props.path)}
      width={props.width}
      src={props.src}
      alt={props.alt}
      className={`cursor-pointer opacity-100 hover:opacity-50 ${props.className}`}
    ></img>
  );
};

export default BaseImage;
