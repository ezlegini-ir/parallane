import { getSessionUser } from "@/data/user";
import { User } from "@parallane/database";
import NavBarContent from "./NavBarContent";

export interface NavbarProps {
  user: User | undefined | null;
}

const NavBar = async () => {
  const user = await getSessionUser();

  return (
    <>
      <div className="md:hidden sticky top-0 z-50">
        <NavBarContent isWide={false} user={user} />
      </div>
      <div className="hidden md:block sticky top-0 z-50">
        <NavBarContent isWide={true} user={user} />
      </div>
    </>
  );
};

export default NavBar;
