"use client";

import { verifyOtp } from "@/actions/login/verify-otp";
import { OtpType, otpSchema } from "@/lib/validationSchema";
import CountdownTimer from "@parallane/ui/components/CountDown";
import Flex from "@parallane/ui/components/Flex";
import Loader from "@parallane/ui/components/Loader";
import { Button } from "@parallane/ui/components/ui/button";
import { CardDescription, CardTitle } from "@parallane/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@parallane/ui/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@parallane/ui/components/ui/input-otp";
import { sendOtpEmail, useLoading } from "@parallane/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Home } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ConfirmEmailForm = ({
  email,
  userId,
  onSuccessfulConfirm,
}: {
  email: string;
  userId: number;
  onSuccessfulConfirm: Dispatch<
    SetStateAction<"CONFIRM_EMAIL" | "PERSONAL_INFO">
  >;
}) => {
  // HOOKS
  const { loading, setLoading } = useLoading();
  const { loading: sendNewCodeLoading, setLoading: setSendNewCodeLoading } =
    useLoading();
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [timerKey, setTimerKey] = useState(0); // Key for the timer reset

  const form = useForm<OtpType>({
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpType) => {
    setLoading(true);

    if (failedAttempts >= 3) {
      toast.warning("Too many attempts, Please try again later.");
      setLoading(false);
      return;
    }

    const res = await verifyOtp(data.otp, email);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      form.reset();
      setFailedAttempts((prev) => prev + 1);
      return;
    }

    setFailedAttempts(0);

    toast.success("Email Verification Successfull!");
    onSuccessfulConfirm("PERSONAL_INFO");
  };

  const otpValue = form.watch("otp");

  useEffect(() => {
    const autoSubmit = async () => {
      if (otpValue.length === 5) {
        await onSubmit({ otp: otpValue });
      }
    };

    autoSubmit();
  }, [otpValue]);

  const onSendNewCode = async () => {
    setSendNewCodeLoading(true);
    const res = await sendOtpEmail({ email, userId });

    if (res.error) {
      toast.error(res.error);
      setSendNewCodeLoading(false);
    }

    if (res.success) {
      setTimerKey((prev) => prev + 1);
      toast.success("New Code Sent to " + email);
      setSendNewCodeLoading(false);
    }
  };

  return (
    <div className="p-5">
      <Flex className="justify-center flex-col mb-6 text-center gap-3">
        <CardTitle>Confirm Email</CardTitle>
        {
          <CardDescription>
            Please insert verification code sent to <br />
            {email}
          </CardDescription>
        }
      </Flex>

      <div>
        <Form {...form}>
          <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
            {
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        autoFocus
                        maxLength={5}
                        {...field}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup
                          autoFocus
                          className="w-full  flex justify-center "
                        >
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
            }

            <CountdownTimer key={timerKey} seconds={120} progressBar />

            <div className="space-y-3">
              <Button
                disabled={!form.formState.isValid || loading}
                className="w-full"
                type="submit"
              >
                {<Loader loading={loading} />}
                Verify Code
              </Button>

              <Button
                onClick={onSendNewCode}
                disabled={sendNewCodeLoading}
                className="w-full"
                type="button"
                variant={"secondary"}
              >
                {<Loader loading={sendNewCodeLoading} />}
                Send New Code
              </Button>

              <div>
                <Link href={"/"}>
                  <Button
                    variant={"outline"}
                    disabled={loading}
                    className="w-full"
                    type="button"
                  >
                    <Home />
                    Home
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmEmailForm;
