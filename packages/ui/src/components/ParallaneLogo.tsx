import Image from "next/image";

interface Props {
  width?: number;
  height?: number;
  inputProps?: any;
  className?: string;
  lightMode?: boolean;
}

const ParallaneLogo = ({
  inputProps,
  className,
  width,
  height,
  lightMode,
}: Props) => {
  return (
    <Image
      src={
        lightMode
          ? "/logos/parallane-logo-light.svg"
          : "/logos/parallane-logo-dark.svg"
      }
      alt={"parallane!"}
      width={width || 142}
      height={height || 30}
      draggable={false}
      {...inputProps}
      className={className}
    />
  );
};

export default ParallaneLogo;
