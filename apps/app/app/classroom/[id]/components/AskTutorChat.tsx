import {
  AskTutorMessages,
  File,
  Image as ImageType,
  Tutor,
  User,
} from "@parallane/database";
import Avatar from "@parallane/ui/components/Avatar";
import { Button } from "@parallane/ui/components/ui/button";
import { truncateFileName } from "@parallane/utils";
import { formatDate } from "date-fns";
import { Download } from "lucide-react";
import Link from "next/link";

interface AskTutorMessageType extends AskTutorMessages {
  attachment: File | null;
}

interface Props {
  messages: AskTutorMessageType[] | undefined;
  user: User | undefined;
  tutor: (Tutor & { image: ImageType | null }) | undefined;
}

const AskTutorChat = ({ messages, tutor, user }: Props) => {
  if (!messages) return;

  return (
    <div className="space-y-3 py-0.5">
      {messages.map((message, index) => (
        <div key={index} className="space-y-3 text-sm">
          <div
            className={`card group relative ${
              message?.senderType === "USER" && "bg-muted"
            }`}
          >
            <div className="w-full space-y-3">
              <div className="flex items-center gap-2">
                {message?.senderType === "TUTOR" ? (
                  <Avatar src={tutor?.image?.url} />
                ) : (
                  <Avatar src={user?.image} />
                )}

                <div className="flex flex-col">
                  <span>
                    {message?.senderType === "TUTOR" ? tutor?.name : user?.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {formatDate(message?.createdAt, "yyyy/MM/dd - HH:mm")}
                  </span>
                </div>
              </div>
              <pre className="text-sm">{message?.message}</pre>
            </div>

            {message?.attachment && (
              <div className="space-y-2">
                <hr className="border-dashed border-muted-foreground/50" />
                <Link
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
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AskTutorChat;
