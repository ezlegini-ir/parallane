import parallaneLogo from "@parallane/ui/components/parallaneLogo";
import { Button } from "@parallane/ui/components/ui/button";
import UserBar from "@parallane/ui/components/UserBar";
import Link from "next/link";
import { NavbarProps } from "./NavBar";
import { User } from "lucide-react";

const WideNavBar = ({ user }: NavbarProps) => {
  return (
    <div className="flex justify-between items-center">
      <Link href={"/"}>
        <parallaneLogo width={130} height={28} />
      </Link>

      {!user ? (
        <Link href={"/panel"}>
          <Button variant={"outline"}>
            <User /> User Panel
          </Button>
        </Link>
      ) : (
        <UserBar user={user} />
      )}
    </div>
  );
};

export default WideNavBar;
