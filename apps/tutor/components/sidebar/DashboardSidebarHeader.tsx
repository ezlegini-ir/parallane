import Avatar from "@parallane/ui/components/Avatar";
import ParallaneLogo from "@parallane/ui/components/ParallaneLogo";
import { SidebarHeader } from "@parallane/ui/components/ui/sidebar";
import { getSessionTutor } from "@/data/tutor";
import Link from "next/link";
import React from "react";

const DashboardSidebarHeader = async () => {
  const sessionUser = await getSessionTutor();

  return (
    <SidebarHeader dir="ltr" className="p-4 space-y-8">
      <Link href={"/"}>
        <ParallaneLogo lightMode width={120} height={26} />
      </Link>

      <div className="bg-slate-100 p-3 px-2 rounded-sm border-dashed border-slate-400/60 border-[1px] flex gap-2 items-center">
        <Avatar src={sessionUser?.image?.url} size={37} />
        <div className="flex flex-col">
          <span>{sessionUser?.name}</span>
          <span className="text-xs text-primary font-semibold">
            {sessionUser?.phone}
          </span>
        </div>
      </div>
    </SidebarHeader>
  );
};

export default DashboardSidebarHeader;
