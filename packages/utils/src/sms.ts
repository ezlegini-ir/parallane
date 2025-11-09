"use server";

import { database } from "@parallane/database";
import { kavenegar } from "./config/kavenegar";
import {
  newQaCreationText,
  newTicketCreationText,
  paidSettlementSmsText,
} from "./sms-templates";

const sender = process.env.KAVENEGAR_SENDER!;

//! SEND -----------------------------------------------------

export const sendSms = async (data: { message: string; phone: string }) => {
  const { message, phone } = data;

  return kavenegar.Send(
    {
      message,
      sender,
      receptor: phone,
    },
    function (response, status) {
      // console.log(response);
      // console.log(status);
    }
  );
};

//! -----------------------------------------------------

export const sendNewTicketCreationSms = async (phone: string) => {
  const ticketsCount = await database.ticket.count({
    where: { status: "PENDING" },
  });

  sendSms({
    message: newTicketCreationText(ticketsCount),
    phone,
  });
};

//! -----------------------------------------------------

export const sendNewQaCreationSms = async (phone: string) => {
  sendSms({
    message: newQaCreationText(),
    phone,
  });
};

//! -----------------------------------------------------

export const sendPaidSettlmentSms = async (
  fullName: string,
  phone: string,
  amount: number
) => {
  sendSms({
    message: paidSettlementSmsText(fullName, amount),
    phone: phone,
  });
};
