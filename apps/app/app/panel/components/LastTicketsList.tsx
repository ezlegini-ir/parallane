import Table from "@parallane/ui/components/Table";
import { Badge } from "@parallane/ui/components/ui/badge";
import { TableCell, TableRow } from "@parallane/ui/components/ui/table";
import Link from "next/dist/client/link";
import CardBox from "./CardBox";
import { Ticket } from "@parallane/database";

const LastTicketsList = ({ tickets }: { tickets: Ticket[] }) => {
  const renderRows = (ticket: Ticket) => {
    const pending = ticket.status === "PENDING";
    const replied = ticket.status === "REPLIED";

    return (
      <TableRow key={ticket.id}>
        <TableCell className="text-xs ">
          <Link href={`/panel/tickets/${ticket.id}`}>{ticket.subject}</Link>
        </TableCell>

        <TableCell className="p-3 font-medium text-xs text-left">
          <Badge
            className="font-normal"
            variant={pending ? "orange" : replied ? "green" : "gray"}
          >
            {pending ? "Pending" : replied ? "Replied" : "Closed"}
          </Badge>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <CardBox
      title="Last Tickets"
      btn={{ title: "View All", href: "/panel/tickets" }}
      className="min-h-[330px] p-0"
    >
      <div>
        <Table
          columns={columns}
          data={tickets}
          renderRows={renderRows}
          noDataMessage="You have not submitted ticket so far."
        />
      </div>
    </CardBox>
  );
};

const columns = [
  { label: "Title", className: "text-left w-4/6 text-xs" },
  { label: "Status", className: "text-xs text-right" },
];

export default LastTicketsList;
