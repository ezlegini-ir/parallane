import { Ticket } from "@parallane/database";
import Filter from "@parallane/ui/components/Filter";
import Pagination from "@parallane/ui/components/Pagination";
import Table from "@parallane/ui/components/Table";
import { TableCell, TableRow } from "@parallane/ui/components/ui/table";
import { formatMiladiDate, globalPageSize } from "@parallane/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import CardBox from "../../components/CardBox";
import TicketStatus from "./TicketStatus";

interface Props {
  tickets: Ticket[];
  ticketsCount: number;
}

const TicketsList = async ({ tickets, ticketsCount }: Props) => {
  return (
    <CardBox
      title="Tickets"
      btn={{ title: "Submit Ticket", href: "/panel/tickets/new" }}
    >
      <div className="flex justify-between">
        <Filter
          name="time"
          placeholder="Newest"
          options={[{ label: "Oldest", value: "oldest" }]}
        />

        <Filter
          name="status"
          placeholder="All Statuses"
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Replied", value: "REPLIED" },
            { label: "Closed", value: "CLOSED" },
          ]}
        />
      </div>

      <div>
        <Table
          columns={columns}
          data={tickets}
          noDataMessage="No tickets available."
          renderRows={renderRows}
        />
        <Pagination pageSize={globalPageSize} totalItems={ticketsCount} />
      </div>
    </CardBox>
  );
};

const renderRows = (ticket: Ticket) => {
  return (
    <TableRow key={ticket.id}>
      <TableCell>{ticket.id}</TableCell>
      <TableCell>
        <Link href={`/panel/tickets/${ticket.id}`}>{ticket.subject}</Link>
      </TableCell>
      <TableCell className="flex justify-center items-center">
        <TicketStatus type={ticket.status} />
      </TableCell>
      <TableCell className="hidden md:table-cell text-center">
        {formatMiladiDate(ticket.createdAt)}
      </TableCell>
      <TableCell className="text-left py-4 hidden lg:table-cell">
        <Link href={`/panel/tickets/${ticket.id}`} className="flex justify-end">
          <Eye size={18} className="text-gray-500" />
        </Link>
      </TableCell>
    </TableRow>
  );
};

const columns = [
  { label: "ID", className: "w-[120px] text-left" },
  { label: "Subject", className: "text-left" },
  { label: "Status", className: "text-center" },
  { label: "Date", className: "w-[200px] hidden md:table-cell text-center" },
  { label: "View", className: "text-left hidden lg:table-cell" },
];

export default TicketsList;
