"use server";

import { adminData } from "@/data/adminData";
import { database, User, Wallet } from "@parallane/database";
import {
  cashBackCalculator,
  sendSuccessPaymentEmail,
  sendSuccessPaymentEmailToAdmin,
} from "@parallane/utils";
import { initiatePurchase, verifyPurchase } from "./yekPay";

//* CREATE PAYMENT -------------------------------------------------------

export interface CheckoutFormDataType {
  amount: number;
  courseId: number;
  user: User & { wallet: Wallet | null };
  discountAmount?: number;
  discountCode?: string;
  discountCodeAmount?: number;
  itemsTotal: number;
  useWallet?: boolean;
  useWalletAmount?: number;
  userDate: {
    firstName: string;
    lastName: string;
    country: string;
    phoneNumber: string;
    postalCode: string;
    address: string;
    city: string;
  };
}

export const createPayment = async (data: CheckoutFormDataType) => {
  const {
    amount,
    courseId,
    discountAmount,
    discountCode,
    discountCodeAmount,
    user,
    itemsTotal,
    useWallet,
    useWalletAmount,
    userDate: {
      firstName,
      lastName,
      country,
      phoneNumber,
      postalCode,
      address,
      city,
    },
  } = data;

  try {
    const existingCoupon = await database.coupon.findFirst({
      where: { code: discountCode },
    });
    if (discountCode && !existingCoupon)
      return { error: "Discount code is not valid" };

    const existingCourse = await database.course.findFirst({
      where: { id: courseId },
    });
    if (!existingCourse) return { error: "This course is not valid" };

    const existingEnrollment = await database.enrollment.findFirst({
      where: { userId: user.id, courseId },
    });

    if (existingEnrollment)
      return { error: "You have already enrolled in this course." };

    await database.user.update({
      where: { id: user.id },
      data: { name: `${firstName} ${lastName}`, country, phoneNumber },
    });

    const newPayment = await database.payment.create({
      data: {
        status: amount > 0 ? "PENDING" : "SUCCESS",
        userId: user.id,
        total: amount,
        itemsTotal,
        paymentMethod: amount > 0 ? "YEKPAY" : "NO_METHOD",
        discountCode,
        discountCodeAmount,
        couponId: existingCoupon?.id,
        discountAmount,
        walletUsed: useWallet,
        walletUsedAmount: useWalletAmount,
        enrollment:
          amount === 0
            ? {
                create: {
                  userId: user.id,
                  courseId: existingCourse.id,
                  price: amount,
                  courseOriginalPrice: existingCourse.basePrice,
                  classroom: {
                    create: {
                      userId: user.id,
                    },
                  },
                },
              }
            : undefined,
      },

      include: {
        user: true,
        enrollment: {
          include: {
            course: true,
            classroom: true,
          },
        },
      },
    });

    // PURCHASE
    if (amount > 0) {
      const res = await initiatePurchase({
        user,
        address,
        city,
        country,
        email: user.email!,
        firstName,
        lastName,
        mobile: phoneNumber || "",
        orderNumber: newPayment.id.toString(),
        amount: amount,
        postalCode: postalCode || "",
      });

      if (res?.success && res.authority && res.paymentUrl) {
        await database.checkout.create({
          data: {
            courseId,
            userId: user.id,
            amount: amount,
            authority: res.authority,
            paymentId: newPayment.id,
          },
        });
      } else {
        return { error: "Something Happened, Please try again later." };
      }

      return {
        success: "Redirecting to payment gateway...",
        paymentUrl: res.paymentUrl,
      };
    } else {
      if (newPayment.walletUsed) {
        await database.wallet.update({
          where: { id: user.wallet?.id },
          data: {
            balance: { decrement: newPayment.walletUsedAmount || 0 },
            used: { increment: 1 },
            transactions: newPayment.walletUsedAmount
              ? {
                  create: {
                    amount: newPayment.walletUsedAmount,
                    type: "DECREMENT",
                    description:
                      "Deduction of wallet due to purchasing a course.",
                  },
                }
              : undefined,
          },
        });
      }

      if (newPayment.discountCode) {
        await database.coupon.update({
          where: { code: newPayment.discountCode },
          data: {
            used: { increment: 1 },
          },
        });
      }

      //* Send Email
      await sendSuccessPaymentEmail(
        newPayment.user.email,
        newPayment.user.name!,
        newPayment
      );

      //* Send Email To Admin
      await sendSuccessPaymentEmailToAdmin(
        adminData.email,
        newPayment.user.name!,
        newPayment
      );

      return {
        success: "Redirecting to Classroom...",
        redirectUrl: `/classroom/${newPayment.enrollment[0]?.classroom?.id}`,
      };
    }
  } catch (error) {
    return { error: String(error) };
  }
};

//* VERIFY PAYMENT -------------------------------------------------------

export const verifyPayment = async (authority: string, status: string) => {
  try {
    if (status !== "0") {
      return { error: "Payment Failed!" };
    }

    const existingCart = await database.checkout.findFirst({
      where: { authority },
    });

    if (!existingCart) return { error: "Payment Token is not valid" };

    const res = await verifyPurchase(authority);

    if (res?.success) {
      const deletedCart = await database.checkout.delete({
        where: { authority },
        include: { payment: true, course: true },
      });

      //* PAYMENT
      const updatedPayment = await database.payment.update({
        where: { id: deletedCart.paymentId },
        include: {
          user: true,
          enrollment: { include: { course: true } },
        },
        data: {
          status: "SUCCESS",
          paidAt: new Date(),
          transactionId: res.authority,
          enrollment: {
            create: {
              userId: deletedCart.userId,
              courseId: deletedCart.courseId,
              price: deletedCart.amount / 10,
              courseOriginalPrice: deletedCart.course.price,
              classroom: {
                create: {
                  userId: deletedCart.userId,
                },
              },
            },
          },
        },
      });

      //* CASHBACK
      const cashbackAmount = cashBackCalculator(updatedPayment.total);
      if (cashbackAmount > 0) {
        const wallet = await database.wallet.upsert({
          where: { userId: updatedPayment.userId },
          update: {
            balance: { increment: cashbackAmount },
            transactions: {
              create: {
                amount: cashbackAmount,
                type: "INCREMENT",
                description: "Charge wallet due to purchasing a course.",
              },
            },
          },
          create: {
            balance: cashbackAmount,
            userId: deletedCart.userId,
            transactions: {
              create: {
                amount: cashbackAmount,
                type: "INCREMENT",
                description: "Charge wallet due to purchasing a course.",
              },
            },
          },
        });

        if (updatedPayment.walletUsed) {
          await database.wallet.update({
            where: { id: wallet.id },
            data: {
              balance: { decrement: updatedPayment.walletUsedAmount || 0 },
              used: { increment: 1 },
              transactions: updatedPayment.walletUsedAmount
                ? {
                    create: {
                      amount: updatedPayment.walletUsedAmount,
                      type: "DECREMENT",
                      description:
                        "Deduction of wallet due to purchasing a course.",
                    },
                  }
                : undefined,
            },
          });
        }
      }

      if (updatedPayment.discountCode) {
        await database.coupon.update({
          where: { code: updatedPayment.discountCode },
          data: {
            used: { increment: 1 },
          },
        });
      }

      //* Send Email
      await sendSuccessPaymentEmail(
        updatedPayment.user.email,
        updatedPayment.user.name!,
        updatedPayment
      );

      //* Send Email To Admin
      await sendSuccessPaymentEmailToAdmin(
        adminData.email,
        updatedPayment.user.name!,
        updatedPayment
      );

      return { success: "Payment Successfull!", refId: res.authority };
    } else {
      await database.checkout.delete({
        where: { authority },
      });
      await database.payment.update({
        where: { id: existingCart.paymentId },
        data: {
          status: "FAILED",
        },
      });

      return { error: "Payment Failed!" };
    }
  } catch (error) {
    return { error: String(error) };
  }
};
