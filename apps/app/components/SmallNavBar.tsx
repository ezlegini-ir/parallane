import Avatar from "@parallane/ui/components/Avatar";
import parallaneLogoSquare from "@parallane/ui/components/parallaneLogoSquare";
import { Button } from "@parallane/ui/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { NavbarProps } from "./NavBar";

const SmallNavBar = ({ user }: NavbarProps) => {
  return (
    <div className="flex justify-between">
      <Link href={"/"}>
        <parallaneLogoSquare size={48} />
      </Link>

      <div className="flex gap-2 text-foreground">
        {user ? (
          <Link href={"/panel"}>
            <Button variant={"outline"}>
              <Avatar src={user.image} size={25} />
              {user.name}
            </Button>
          </Link>
        ) : (
          <Link href={"/panel"}>
            <Button variant={"outline"}>
              <User className="scale-125" />
              User Panel
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SmallNavBar;
