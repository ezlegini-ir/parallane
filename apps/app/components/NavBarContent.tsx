"use client";

import { User } from "@parallane/database";
import { useEffect, useState } from "react";
import SmallNavBar from "./SmallNavBar";
import WideNavBar from "./WideNavBar";

interface Props {
  isWide: boolean;
  user: User | null | undefined;
}

const NavBarContent = ({ isWide, user }: Props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = scrolled
    ? "bg-background/65 backdrop-blur-sm shadow transition-all p-2 fixed w-full top-0 right-0"
    : "transition-all";

  return (
    <div className={navClass}>
      <div className="w-full max-w-screen-xl mx-auto">
        {isWide ? <WideNavBar user={user} /> : <SmallNavBar user={user} />}
      </div>
    </div>
  );
};

export default NavBarContent;
