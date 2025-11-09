import { database } from "@parallane/database";
import { notFound } from "next/navigation";
import React from "react";
import QaChat from "./QaChat";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
  const { id } = await params;

  const qa = await database.askTutor.findFirst({
    where: { id: +id },
    include: {
      user: true,
      tutor: { include: { image: true } },
      course: { include: { image: true } },
      messages: {
        orderBy: { createdAt: "desc" },
        include: {
          attachment: true,
        },
      },
    },
  });

  if (!qa) return notFound();

  return (
    <div>
      <QaChat qa={qa} />
    </div>
  );
};

export default page;
