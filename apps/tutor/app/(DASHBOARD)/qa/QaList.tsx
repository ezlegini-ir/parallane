import Avatar from "@parallane/ui/components/Avatar";
import Pagination from "@parallane/ui/components/Pagination";
import Table from "@parallane/ui/components/Table";
import { Badge } from "@parallane/ui/components/ui/badge";
import { TableCell, TableRow } from "@parallane/ui/components/ui/table";
import ViewButton from "@parallane/ui/components/ViewButton";
import { placeHolder } from "@/public";
import { AskTutor, Course, Image as ImageType, User } from "@parallane/database";
import Image from "next/image";
import { formatDate } from "date-fns";

interface QaType extends AskTutor {
  user: User;
  course: Course & { image: ImageType | null };
}

interface Props {
  qas: QaType[];
  totalTickets: number;
  pageSize: number;
}

const QaList = async ({ qas, totalTickets, pageSize }: Props) => {
  return (
    <>
      <Table
        columns={columns}
        data={qas}
        renderRows={renderRows}
        noDataMessage="There is yet no messages..."
      />

      <Pagination pageSize={pageSize} totalItems={totalTickets} />
    </>
  );
};

const renderRows = (qa: QaType) => {
  return (
    <TableRow key={qa.id} className="odd:bg-slate-50">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar src={qa.user.image} />
          {qa.user.name}
        </div>
      </TableCell>

      <TableCell className="hidden xl:table-cell">
        <div className="flex items-center gap-3">
          <Image
            alt=""
            src={qa.course.image?.url || placeHolder}
            width={60}
            height={60}
            className="rounded-sm object-center"
          />
          {qa.course.title}
        </div>
      </TableCell>

      <TableCell className="text-left hidden lg:table-cell">
        {formatDate(qa.createdAt, "PPP")}
      </TableCell>
      <TableCell className="text-left">
        {formatDate(qa.updatedAt, "PPP")}
      </TableCell>

      <TableCell>
        <Badge
          className="p-1 px-3"
          variant={qa.status === "PENDING" ? "orange" : "green"}
        >
          {qa.status}
        </Badge>
      </TableCell>

      <TableCell>
        <ViewButton href={`/qa/${qa.id}`} />
      </TableCell>
    </TableRow>
  );
};

const columns = [
  { label: "User", className: "" },
  { label: "Course", className: "hidden xl:table-cell" },
  { label: "Created At", className: "hidden lg:table-cell" },
  { label: "Last Message", className: "" },
  { label: "Status", className: "" },
  { label: "View", className: "" },
];

export default QaList;
