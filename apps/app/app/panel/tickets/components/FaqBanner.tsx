import { Button } from "@parallane/ui/components/ui/button";
import { Headset, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import CardBox from "../../components/CardBox";

const FaqBanner = () => {
  return (
    <CardBox title="Submit Ticket" className="h-full">
      <div className="flex flex-col gap-3 justify-center items-center py-10">
        <Headset size={90} className="text-slate-400" />

        <div className="text-center">
          <p>
            By visiting the
            <span className="text-primary font-semibold">
              {" "}
              "Frequently Asked Questions"{" "}
            </span>
            page, you can quickly solve your problem!
          </p>
        </div>

        <div className="flex gap-3">
          <Link href={"/faq"}>
            <Button>Frequently Asked Questions</Button>
          </Link>
          <Link href={"/panel/tickets/new"}>
            <Button variant={"secondary"}>
              <Plus />
              New Ticket
            </Button>
          </Link>
        </div>
      </div>
    </CardBox>
  );
};

export default FaqBanner;
