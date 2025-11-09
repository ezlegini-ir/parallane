export function newTicketCreationText(ticketsCount: number) {
  const message = [`🔷 New Ticket is received`, `Total: ${ticketsCount}`].join(
    "\n"
  );

  return message;
}

export function newQaCreationText() {
  const message = [`🔷 Dear Tutor`, `New QA is received`].join("\n");

  return message;
}

export function paidSettlementSmsText(fullName: string, amount: number) {
  const message = [
    `🔷 ${fullName}, dear tutor of parallane,`,
    `An amount of ${amount.toLocaleString("en-US")} Toman has been queued for payment for this course from your sales rights on the parallane website.`,
    "It is our honor to collaborate with you.",
    "parallane",
  ].join("\n");

  return message;
}
