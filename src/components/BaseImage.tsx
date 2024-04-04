interface IBaseImage {
  className?: string;
  src: string;
  alt: string;
  width: string;
}

const BaseImage = (props: IBaseImage) => {
  return (
    <img
      width={props.width}
      src={props.src}
      alt={props.alt}
      className={`cursor-pointer opacity-100 hover:opacity-50 ${props.className}`}
    ></img>
  );
};

export default BaseImage;
