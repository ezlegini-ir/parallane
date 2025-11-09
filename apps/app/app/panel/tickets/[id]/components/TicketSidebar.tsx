"use client";

import { closeTicket } from "@/actions/ticket";
import CardBox from "@/app/panel/components/CardBox";
import { Ticket, TicketDepartment } from "@parallane/database";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@parallane/ui/components/ui/alert-dialog";
import { Button } from "@parallane/ui/components/ui/button";
import { Separator } from "@parallane/ui/components/ui/separator";
import { formatMiladiDate } from "@parallane/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import TicketStatus from "../../components/TicketStatus";

interface Props {
  ticket: Ticket;
}

const TicketSidebar = ({ ticket }: Props) => {
  //HOOKS
  const router = useRouter();

  const onCloseTicket = async () => {
    const res = await closeTicket(ticket.id);

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    if (res.success) {
      toast.success(res.success);
      router.refresh();
    }
  };

  const getDepartmentName = (department: TicketDepartment) => {
    switch (department) {
      case "COURSE":
        return "Education";
      case "FINANCE":
        return "Finance";
      case "SUGGEST":
        return "Suggestions and Criticisms";
      case "TECHNICAL":
        return "Technical";
    }
  };

  return (
    <CardBox title="Summary">
      <div className="space-y-2">
        <div className="text-foreground text-sm">Status</div>
        <TicketStatus wide type={ticket.status} className="p-3 text-sm" />
        <Separator />
      </div>

      <div className="space-y-2">
        <div className="text-foreground text-sm">Subject</div>
        <div>{ticket.subject}</div>
        <Separator />
      </div>

      <div className="space-y-2">
        <div className="text-foreground text-sm">Department</div>
        <div>{getDepartmentName(ticket.department)}</div>
        <Separator />
      </div>

      <div className="space-y-2">
        <div className="text-foreground text-sm">Created At</div>
        <div>{formatMiladiDate(ticket.createdAt)}</div>
        <Separator />
      </div>

      <div className="space-y-3 hidden md:block">
        {ticket.status !== "CLOSED" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"lightBlue"} className="w-full">
                Thanks, my problem is solved.
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to close this ticket as solved?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-0 sm:gap-2">
                <AlertDialogCancel>Back</AlertDialogCancel>
                <AlertDialogAction onClick={onCloseTicket}>
                  Yes, close the ticket
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <div>
          <Link href={"/panel/tickets"}>
            <Button className="w-full" variant={"secondary"}>
              Back
            </Button>
          </Link>
        </div>
      </div>
    </CardBox>
  );
};

export default TicketSidebar;
