"use client";

import { resetPassword } from "@/actions/login/resetPassword";
import { signInUser } from "@/actions/login/signin-user";
import {
  ResetPasswordFormType,
  resetPasswordFormSchema,
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
import { Check, CheckCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  token: string;
  email: string;
}

const ResetPasswordForm = ({ token, email }: Props) => {
  // HOOKS
  const { loading, setLoading } = useLoading();
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const form = useForm<ResetPasswordFormType>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onResetPassword = async (data: ResetPasswordFormType) => {
    setLoading(true);

    const res = await resetPassword({ data, email, token });

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    if (res.success && res.newPassword) {
      toast.success(res.success);
      setIsPasswordReset(true);
      const signInRes = await signInUser({ email, password: data.newPassword });

      if (signInRes.error) {
        toast.error(signInRes.error);
        setLoading(false);
        return;
      }

      if (signInRes.success) {
        toast.success(signInRes.success);
        redirect("/panel");
      }
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8 w-[350px]">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onResetPassword)}
        >
          {isPasswordReset ? (
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="bg-green-500/20 border-green-500/60 border text-green-500 p-6 rounded-full ">
                <CheckCircle size={80} />
              </div>

              <p className="text-sm">Password has been Reset Successfully.</p>
            </div>
          ) : (
            <>
              <CardTitle>
                <h3 className="font-medium">🔒 Let's Reset Your Password</h3>
              </CardTitle>
              <CardDescription className="text-xs">
                Please enter your New Password.
              </CardDescription>

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => {
                  const password = field.value || "";

                  const checks = [
                    {
                      label: "At least 8 characters",
                      valid: password.length >= 8,
                    },
                    {
                      label: "At least one uppercase letter",
                      valid: /[A-Z]/.test(password),
                    },
                    {
                      label: "At least one lowercase letter",
                      valid: /[a-z]/.test(password),
                    },
                    {
                      label: "At least one number",
                      valid: /\d/.test(password),
                    },
                  ];

                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="********"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}

                      <div className="mt-2 space-y-1">
                        {checks.map((check, i) => (
                          <p
                            key={i}
                            className={`flex items-center gap-2 text-xs ${
                              check.valid
                                ? "text-green-500"
                                : "text-muted-foreground"
                            }`}
                          >
                            <Check size={14} /> {check.label}
                          </p>
                        ))}
                      </div>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={
                  !form.formState.isValid ||
                  loading ||
                  form.watch("newPassword") !== form.watch("confirmPassword")
                }
                className="w-full flex gap-2"
                type="submit"
              >
                {<Loader loading={loading} />}
                Reset Password
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
