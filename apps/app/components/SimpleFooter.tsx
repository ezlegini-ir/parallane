import Link from "next/link";
import ParallaneLogoSquare from "@parallane/ui/components/ParallaneLogoSquare";
import SocialsIcon from "@parallane/ui/components/SocialsIcon";

const SimpleFooter = () => {
  return (
    <div>
      <div className="py-3 border-b border-t flex justify-between items-center">
        <Link href={"/"}>
          <ParallaneLogoSquare size={40} />
        </Link>

        <SocialsIcon />
      </div>
    </div>
  );
};

export default SimpleFooter;
