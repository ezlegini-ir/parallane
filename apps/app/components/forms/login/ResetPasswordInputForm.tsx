"use client";

import { sendResetPasswordToken } from "@/actions/login/resetPassword";
import {
  ResetPasswordInputFormType,
  resetPasswordInputFormSchema,
} from "@/lib/validationSchema";
import Loader from "@parallane/ui/components/Loader";
import { Button } from "@parallane/ui/components/ui/button";
import { CardDescription, CardTitle } from "@parallane/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@parallane/ui/components/ui/form";
import { Input } from "@parallane/ui/components/ui/input";
import { useLoading } from "@parallane/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginFormsProps } from "./LoginForm";

const ResetPasswordInputForm = ({ setLoginStep }: LoginFormsProps) => {
  // HOOKS
  const { loading, setLoading } = useLoading();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<ResetPasswordInputFormType>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordInputFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onResetPassword = async ({ email }: ResetPasswordInputFormType) => {
    setLoading(true);

    const res = await sendResetPasswordToken(email);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    if (res.success) {
      toast.success(res.success);
      setIsEmailSent(true);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onResetPassword)}
        >
          {isEmailSent ? (
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="bg-green-500/20 border-green-500/60 border text-green-500 p-6 rounded-full ">
                <CheckCircle size={80} />
              </div>

              <p className="text-sm">
                Reset Link Sent To {form.getValues("email")}
              </p>
            </div>
          ) : (
            <>
              <div className="text-center space-y-1">
                <CardTitle>
                  <h3 className="font-medium">🔒 Reset Your Password</h3>
                </CardTitle>
                <CardDescription className="text-xs">
                  Please enter your Email to Identify you.
                </CardDescription>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        type="email"
                        placeholder="test@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={!form.formState.isValid || loading}
                className="w-full flex gap-2"
                type="submit"
              >
                {<Loader loading={loading} />}
                Send Reset Link
              </Button>
            </>
          )}

          <Button
            variant={isEmailSent ? "outline" : "ghost"}
            onClick={() => setLoginStep("INPUT")}
            className="w-full flex gap-2"
            type="submit"
          >
            Return
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordInputForm;
