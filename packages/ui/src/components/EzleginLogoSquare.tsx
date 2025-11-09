import Image from "next/image";

interface Props {
  size?: number;
  inputProps?: any;
}

const parallaneLogoSquare = ({ size, inputProps }: Props) => {
  return (
    <Image
      src={"/parallane-logo-square.svg"}
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

export default parallaneLogoSquare;
