import { Badge } from "@parallane/ui/components/ui/badge";
import React from "react";

const TicketStatus = ({
  type,
  className,
  wide,
}: {
  type: "PENDING" | "CLOSED" | "REPLIED";
  className?: string;
  wide?: boolean;
}) => {
  const pending = type === "PENDING";
  const answered = type === "REPLIED";

  return (
    <Badge
      className={`font-normal text-xs flex justify-center ${
        wide ? "w-full" : "max-w-[100px]"
      } ${className}`}
      variant={pending ? "orange" : answered ? "green" : "gray"}
    >
      <div>{pending ? "Pending" : answered ? "Replied" : "Closed"}</div>
    </Badge>
  );
};

export default TicketStatus;
