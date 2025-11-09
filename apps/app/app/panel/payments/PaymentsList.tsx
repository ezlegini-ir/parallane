import { placeHolder } from "@/public";
import {
  Course,
  Enrollment,
  Image as ImageType,
  Payment,
} from "@parallane/database";
import CardBox from "@parallane/ui/components/CardBox";
import Table from "@parallane/ui/components/Table";
import { Badge } from "@parallane/ui/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@parallane/ui/components/ui/dialog";
import { TableCell, TableRow } from "@parallane/ui/components/ui/table";
import { formatPrice } from "@parallane/utils";
import { formatDate } from "date-fns";
import { Eye } from "lucide-react";
import Image from "next/image";

interface PaymentType extends Payment {
  enrollment: (Enrollment & { course: Course & { image: ImageType | null } })[];
}

interface Props {
  payments: PaymentType[];
}

const PaymentsList = ({ payments }: Props) => {
  const renderRows = (payment: PaymentType) => {
    const courses = payment.enrollment.map((item) => item.course);

    const success = payment.status === "SUCCESS";
    const pending = payment.status === "PENDING";
    const canceled = payment.status === "CANCELED";

    const status = success ? (
      <Badge
        className="w-[90px] text-nowrap flex justify-center font-medium"
        variant={"green"}
      >
        Successful
      </Badge>
    ) : pending ? (
      <Badge
        className="w-[90px] text-nowrap flex justify-center font-medium"
        variant={"orange"}
      >
        Awaiting
      </Badge>
    ) : canceled ? (
      <Badge
        className="w-[90px] text-nowrap flex justify-center font-medium"
        variant={"gray"}
      >
        Canceled
      </Badge>
    ) : (
      <Badge
        className="w-[90px] text-nowrap flex justify-center font-medium"
        variant={"red"}
      >
        Unsuccessful
      </Badge>
    );

    return (
      <TableRow key={payment.id}>
        <TableCell>{payment.id}</TableCell>
        <TableCell>{formatDate(payment.createdAt, "PPP - HH:mm:ss")}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell className="text-center">
          {formatPrice(payment.discountAmount)}
        </TableCell>
        <TableCell className="py-4 text-center">
          {formatPrice(payment.total)}
        </TableCell>
        <TableCell className="text-left py-2">
          <Dialog>
            <DialogTrigger className="w-full">
              <div className="flex justify-end">
                <Eye
                  size={33}
                  className="text-foreground hover:text-primary scale-90 bg-muted p-2 rounded-full"
                />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-base">Purchased Courses</DialogTitle>
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-muted p-2 rounded-sm flex items-center gap-2 mb-3"
                >
                  <Image
                    alt=""
                    src={course.image?.url || placeHolder}
                    width={80}
                    height={80}
                    className="rounded-sm"
                  />
                  <span className="text-sm">{course.title}</span>
                </div>
              ))}
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <CardBox title="Payments" className="min-h-[350px]">
      <Table
        columns={columns}
        data={payments}
        renderRows={renderRows}
        noDataMessage="You have not made any payments yet"
      />
    </CardBox>
  );
};

const columns = [
  { label: "Payment ID", className: "" },
  { label: "Creation Date", className: "" },
  { label: "Status", className: "" },
  { label: "Discount", className: "text-center" },
  { label: "Amount", className: "text-center" },
  { label: "Courses", className: "text-right" },
];

export default PaymentsList;
