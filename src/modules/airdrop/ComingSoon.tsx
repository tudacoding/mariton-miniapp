

interface CenteredContentProps {
    imageSrc: string;
    title: string;
    description: string;
  }

  const CenteredContent = ({ imageSrc, title, description }: CenteredContentProps) => (
    <div className="flex flex-col items-center justify-center h-full" >
      <img src={imageSrc} alt="centered-content" className="mb-4" width={60} />
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-center">{description}</p>
    </div>
  );

  export default CenteredContent;