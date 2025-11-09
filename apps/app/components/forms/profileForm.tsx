"use client";

import { updateUserProfile } from "@/actions/user";
import CardBox from "@/app/panel/components/CardBox";
import { profileFormSchema, ProfileFormType } from "@/lib/validationSchema";
import { User } from "@parallane/database";
import Loader from "@parallane/ui/components/Loader";
import { Button } from "@parallane/ui/components/ui/button";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { toast } from "sonner";
import { CountrySelectInput } from "./login/CountrySelectInput";

interface Props {
  user: User;
}

const UserProfileForm = ({ user }: Props) => {
  // HOOKS
  const router = useRouter();
  const { loading, setLoading } = useLoading();

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      email: user.email,
      name: user.name || "",
      country: user.country || "",
      phoneNumber: user.phoneNumber || "",
    },
  });

  const onSubmit = async (data: ProfileFormType) => {
    setLoading(true);

    const res = await updateUserProfile(data, user.id);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
    }

    if (res.success) {
      toast.success(res.success);
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <CardBox title="Personal Information" className="max-w-sm mx-auto">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
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

          <Button
            disabled={
              !form.formState.isValid || !form.formState.isDirty || loading
            }
            className="w-full flex gap-2"
            type="submit"
          >
            {<Loader loading={loading} />}
            Save Changes
          </Button>
        </form>
      </Form>
    </CardBox>
  );
};

export default UserProfileForm;
