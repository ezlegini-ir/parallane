import Image from "next/image";

interface Props {
  size?: number;
  inputProps?: any;
}

const ParallaneLogoSquare = ({ size, inputProps }: Props) => {
  return (
    <Image
      src={"/logos/parallane-logo-square.svg"}
      alt={"parallane"}
      width={size || 50}
      height={size || 50}
      draggable={false}
      {...inputProps}
      priority
      loading="eager"
      className="hover:scale-105 transition-transform"
    />
  );
};

export default ParallaneLogoSquare;
