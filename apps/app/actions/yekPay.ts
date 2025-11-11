"use server";

import { User } from "@parallane/database";
import axios from "axios";

interface PurchaseParams {
  user: User;
  amount: number;
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  postalCode: string;
  country: string;
  city: string;
}

export async function initiatePurchase(params: PurchaseParams) {
  const {
    user,
    amount,
    orderNumber,
    firstName,
    lastName,
    email,
    mobile,
    address,
    postalCode,
    country,
    city,
  } = params;

  const requestPaymentUrl =
    process.env.NODE_ENV === "development"
      ? "https://api.ypsapi.com/api/sandbox/request"
      : "https://gate.ypsapi.com/api/payment/request";

  try {
    const response = await axios.post(requestPaymentUrl, {
      merchantId: process.env.YEKPAY_MERCHANT_ID,
      amount: amount.toFixed(2),
      fromCurrencyCode: "978",
      toCurrencyCode: "978",
      orderNumber,
      callback:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api/payment-result"
          : "https://parallane.com/api/payment-result",
      firstName,
      lastName,
      email,
      mobile,
      address,
      postalCode,
      country,
      city,
      description: `Payment Id: ${orderNumber} - User Id: ${user.id}`,
    });

    const data = response.data;

    if (data.Code === 100 && data.Authority) {
      const paymentUrl =
        (process.env.NODE_ENV === "development"
          ? `https://api.ypsapi.com/api/sandbox/payment/`
          : `https://gate.ypsapi.com/api/payment/start/`) + data.Authority;

      return {
        success: true,
        paymentUrl,
        authority: data.Authority,
      };
    } else {
      return {
        success: false,
        error: data.Description || "Unknown error from YekPay API",
        code: data.Code,
      };
    }
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
}

export async function verifyPurchase(authority: string) {
  if (!authority) return { error: "Authory is needed" };

  try {
    const verifyPaymentUrl =
      process.env.NODE_ENV === "development"
        ? "https://api.ypsapi.com/api/sandbox/verify"
        : "https://gate.ypsapi.com/api/payment/verify";

    const response = await axios.post(verifyPaymentUrl, {
      merchantId: process.env.YEKPAY_MERCHANT_ID,
      authority,
    });

    const data = response.data;

    if (data.Code === 100) {
      return {
        success: true,
        authority,
      };
    } else {
      return {
        success: false,
        error: data.Description || "Unknown error from YekPay API",
        code: data.Code,
      };
    }
  } catch (error) {
    console.error(error);
    return { error: String(error) };
  }
}
