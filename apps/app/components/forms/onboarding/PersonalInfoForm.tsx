"use client";

import { compeleteOnboarding } from "@/actions/user";
import {
  personalInfoFormSchema,
  PersonalInfoFormType,
} from "@/lib/validationSchema";
import Loader from "@parallane/ui/components/Loader";
import { Button } from "@parallane/ui/components/ui/button";
import { CardContent, CardHeader } from "@parallane/ui/components/ui/card";
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
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { toast } from "sonner";
import { CountrySelectInput } from "../login/CountrySelectInput";
import { UserType } from "./OnboardingForm";
import Link from "next/link";
import { Home } from "lucide-react";

const PersonalInfoForm = ({ user }: { user?: UserType | null }) => {
  // HOOKS
  const { loading, setLoading } = useLoading();
  // CONSTS

  const form = useForm<PersonalInfoFormType>({
    mode: "onChange",
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      fullName: user?.name || "",
      country: user?.country || "US",
      phoneNumber: user?.phoneNumber || "",
    },
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const redirectTo = searchParams.get("redirectTo");

  const onSubmit = async (data: PersonalInfoFormType) => {
    setLoading(true);

    const res = await compeleteOnboarding(data);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    if (res.success) {
      toast.success(res.success);
      setLoading(false);
      redirect(callbackUrl ? callbackUrl : redirectTo ? redirectTo : "/panel");
    }
  };

  return (
    <>
      <CardHeader className="text-center">
        <h3>Welcome Aboard!👋</h3>
        <p className="text-muted-foreground text-sm">
          Please tell us a bit more about yourself.
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountrySelectInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Phone Number</FormLabel> */}
                  <FormControl>
                    <PhoneInput
                      specialLabel="Phone Number"
                      country={form.watch("country")?.toLowerCase()}
                      value={field.value}
                      onChange={(phone) => field.onChange(phone)}
                      buttonStyle={{
                        visibility: "hidden",
                      }}
                      containerStyle={{
                        fontSize: "14px",
                      }}
                      inputStyle={{
                        marginTop: "4px",
                        paddingLeft: "20px",
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        color: "white",
                        border: "1px solid rgb(30, 41, 59)",
                        borderRadius: "10px",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Button
                disabled={!form.formState.isValid || loading}
                className="w-full"
                type="submit"
              >
                <Loader loading={loading} />
                Complete
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
      </CardContent>
    </>
  );
};

export default PersonalInfoForm;
