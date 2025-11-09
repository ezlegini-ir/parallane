import Image from "next/image";

interface Props {
  width?: number;
  height?: number;
  inputProps?: any;
  className?: string;
  lightMode?: boolean;
}

const parallaneLogo = ({
  inputProps,
  className,
  width,
  height,
  lightMode,
}: Props) => {
  return (
    <Image
      src={lightMode ? "/parallane-logo-light.svg" : "/parallane-logo-dark.svg"}
      alt={"parallane!"}
      width={width || 142}
      height={height || 30}
      draggable={false}
      {...inputProps}
      className={className}
    />
  );
};

export default parallaneLogo;
