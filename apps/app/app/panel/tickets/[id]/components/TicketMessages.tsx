import { parallaneLogoSquare } from "@/public";
import Avatar from "@parallane/ui/components/Avatar";
import { Button } from "@parallane/ui/components/ui/button";
import { truncateFileName } from "@parallane/utils";
import { formatDate } from "date-fns";
import { Download } from "lucide-react";
import Image from "next/image";
import { TicketMessagesProps } from "./TicketChat";

const TicketMessages = ({ messages }: TicketMessagesProps) => {
  return (
    <div className="space-y-3 max-h-[750px] overflow-auto">
      {messages?.map((message, index) => (
        <div key={index} className="space-y-3 text-sm">
          <div
            className={`card p-4 group relative space-y-3 ${
              message.senderType === "USER" && "bg-muted"
            }`}
          >
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2">
                {message.senderType === "ADMIN" ? (
                  <Image
                    alt=""
                    src={parallaneLogoSquare}
                    width={40}
                    height={40}
                  />
                ) : (
                  <Avatar src={message.user?.image} />
                )}

                <div className="flex flex-col text-muted-foreground">
                  <span>
                    {message.senderType === "ADMIN"
                      ? "parallane"
                      : message.user?.name}
                  </span>
                  <span className="text-[10px] ">
                    {formatDate(
                      new Date(message.createdAt),
                      "yyyy/MM/dd - HH:mm"
                    )}
                  </span>
                </div>
              </div>
              <pre style={{ fontFamily: "Inter" }} className="text-sm">
                {message.message}
              </pre>
            </div>
            {message.attachment && (
              <div className="space-y-2">
                <hr className="border-dashed border-muted-foreground/50" />
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={message.attachment.url}
                  className="flex justify-end gap-2 items-center text-nowrap text-xs text-muted-foreground"
                >
                  <span title={message.attachment.fileName}>
                    {truncateFileName(message.attachment.fileName, 30)}
                  </span>
                  <Button
                    variant={"lightBlue"}
                    size={"icon"}
                    className="h-8 w-8"
                    type="button"
                  >
                    <Download />
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketMessages;
