"use client";

import { signInUser } from "@/actions/login/signin-user";
import OAuthSignInForm from "@/components/sign-in";
import { LoginFormType, loginFormSchema } from "@/lib/validationSchema";
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
import { Separator } from "@parallane/ui/components/ui/separator";
import { isHumanOrNot, useLoading } from "@parallane/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginFormsProps } from "./LoginForm";

const InputForm = ({
  setLoginStep,
  redirectTo,
  onSuccess,
  callbackUrl,
}: LoginFormsProps) => {
  // HOOKS
  const { loading, setLoading } = useLoading();
  const [failedAttempts, setFailedAttempts] = useState(0);

  const form = useForm<LoginFormType>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSignIn = async ({ email, password }: LoginFormType) => {
    setLoading(true);

    if (failedAttempts >= 3) {
      toast.warning("Too many try, Please try agian later.");
      setLoginStep("INPUT");
      setLoading(false);
      return;
    }

    let recaptchaToken: string | undefined = undefined;
    if (failedAttempts >= 1) {
      if (!executeRecaptcha) {
        toast.error("reCAPTCHA is not ready, Please try again after a moment.");
        setLoading(false);
        return;
      }

      recaptchaToken = await executeRecaptcha("verify_otp");
    }
    if (recaptchaToken) await isHumanOrNot(recaptchaToken);

    const res = await signInUser({ email, password });

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      setFailedAttempts((prev) => prev + 1);
      return;
    }

    if (res.success) {
      toast.success(res.success);
      if (onSuccess) onSuccess();
      redirect(callbackUrl ? callbackUrl : redirectTo ? redirectTo : "/panel");
    }

    setFailedAttempts(0);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-1">
        <CardTitle>
          <h3 className="font-medium">Welcome back to parallane!</h3>
        </CardTitle>
        <CardDescription className="text-xs">
          Please enter your details to sign in your account
        </CardDescription>
      </div>

      <OAuthSignInForm />

      <div className="flex items-center gap-2">
        <Separator className="flex-1 border-gray-300" />
        <span className="text-muted-foreground text-xs">Or sign in with</span>
        <Separator className="flex-1 border-gray-300" />
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSignIn)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="test@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
            disabled={!form.formState.isValid || loading}
            className="w-full flex gap-2"
            type="submit"
          >
            {<Loader loading={loading} />}
            Sign In
          </Button>

          <div className="flex gap-3 pt-8">
            <Button
              variant={"outline"}
              onClick={() => setLoginStep("REGISTER")}
              className="w-full"
              type="button"
            >
              Create Account
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => setLoginStep("FORGOTPASSWORD")}
              className="w-full"
              type="button"
            >
              Forgot Password?
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InputForm;
