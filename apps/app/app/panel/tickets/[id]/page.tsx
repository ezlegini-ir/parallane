import { Button } from "@parallane/ui/components/ui/button";
import TicketSidebar from "./components/TicketSidebar";
import TicketChat from "./components/TicketChat";
import { database } from "@parallane/database";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

const getTicket = cache(async (id: string) => {
  return database.ticket.findUnique({
    where: { id: +id },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        include: {
          attachment: true,
          user: true,
        },
      },
    },
  });
});

const page = async ({ params }: Props) => {
  const { id } = await params;

  const ticket = await getTicket(id);

  if (!ticket) return notFound();

  return (
    <div className="space-y-3">
      <div className="md:hidden flex justify-between">
        <Button>Thanks, my issue is resolved</Button>
        <Button variant={"secondary"}>Back</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-8 gap-3">
        <div className="col-span-8  lg:col-span-5 xl:col-span-6 h-full">
          <TicketChat messages={ticket?.messages} />
        </div>

        <div className="col-span-8  lg:col-span-3 xl:col-span-2 text-gray-500 text-sm">
          <TicketSidebar ticket={ticket} />
        </div>
      </div>
    </div>
  );
};

export default page;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const ticket = await getTicket(id);
  if (!ticket) return {};

  return {
    title: `${ticket.subject} - Tickets`,
  };
}
