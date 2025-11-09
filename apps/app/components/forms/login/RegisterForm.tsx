"use client";

import { signInUser } from "@/actions/login/signin-user";
import { registerUser } from "@/actions/user";
import {
  registerUserFormSchema,
  RegisterUserFormType,
} from "@/lib/validationSchema";
import Loader from "@parallane/ui/components/Loader";
import { Button } from "@parallane/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@parallane/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@parallane/ui/components/ui/form";
import { Input } from "@parallane/ui/components/ui/input";
import { sendOtpEmail, useLoading } from "@parallane/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Handshake } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginFormsProps } from "./LoginForm";

const RegisterForm = ({
  setLoginStep,
  redirectTo,
  onSuccess,
  callbackUrl,
}: LoginFormsProps) => {
  // HOOKS
  const { loading, setLoading } = useLoading();

  const form = useForm<RegisterUserFormType>({
    mode: "onChange",
    resolver: zodResolver(registerUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onRegisterUser = async (data: RegisterUserFormType) => {
    setLoading(true);

    const res = await registerUser(data);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    const auth = await signInUser({
      email: data.email,
      password: data.password,
    });

    if (auth?.error) {
      toast.error(auth.error);
      setLoading(false);
      return;
    }

    if (auth.success) {
      toast.success(auth.success);
      if (onSuccess) onSuccess();

      await sendOtpEmail({ email: data.email, userId: res.user?.id });

      redirect(
        callbackUrl
          ? `/onboarding?callbackUrl=${callbackUrl}`
          : redirectTo
            ? `/onboarding?redirectTo=${redirectTo}`
            : "/onboarding"
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-1">
        <CardTitle>
          <h3 className="font-medium">🎉 Create an Account!</h3>
        </CardTitle>
        <CardDescription className="text-xs">
          Please enter your information to complete your registration.
        </CardDescription>
      </div>

      <CardContent className="p-0">
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(onRegisterUser)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="test@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
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

            <div className="pt-8 space-y-3">
              <Card className="p-3">
                <p className=" text-xs drop-shadow-none flex gap-3 items-center justify-center">
                  <Handshake size={40} />

                  <span>
                    By registering on parallane, you agree to its{" "}
                    <Link
                      className="underline text-primary"
                      href={"/terms-and-conditions"}
                    >
                      Terms & Conditions!
                    </Link>
                  </span>
                </p>
              </Card>

              <Button
                disabled={!form.formState.isValid || loading}
                className="w-full"
                type="submit"
              >
                <Loader loading={loading} />
                Create Account
              </Button>

              <Button
                onClick={() => setLoginStep("INPUT")}
                variant={"ghost"}
                className="w-full"
                type="button"
              >
                Return
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};

export default RegisterForm;
