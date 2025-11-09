import TicketMessageForm from "@/components/forms/TicketMessageForm";
import { File, TicketMessage, User } from "@parallane/database";
import { Separator } from "@parallane/ui/components/ui/separator";
import TicketMessages from "./TicketMessages";

export interface TicketMessagesProps {
  messages: (TicketMessage & {
    user: User | null;
    attachment: File | null;
  })[];
}

const TicketChat = ({ messages }: TicketMessagesProps) => {
  return (
    <div className="space-y-4">
      <TicketMessageForm ticketId={messages[0].ticketId} />

      <Separator />

      <TicketMessages messages={messages} />
    </div>
  );
};

export default TicketChat;
