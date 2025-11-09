import Link from "next/link";
import parallaneLogoSquare from "@parallane/ui/components/parallaneLogoSquare";
import SocialsIcon from "@parallane/ui/components/SocialsIcon";

const SimpleFooter = () => {
  return (
    <div>
      <div className="py-3 border-b border-t flex justify-between items-center">
        <Link href={"/"}>
          <parallaneLogoSquare size={40} />
        </Link>

        <SocialsIcon />
      </div>
    </div>
  );
};

export default SimpleFooter;
