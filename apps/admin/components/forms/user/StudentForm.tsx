"use client";

import { createUser, deleteUser, updateUser } from "@/actions/user";
import AvatarField from "@/components/forms/AvatarField";
import { StudentFormType, studentFormSchema } from "@/lib/validationSchema";
import { User } from "@parallane/database";
import DeleteButton from "@parallane/ui/components/DeleteButton";
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
import { useImagePreview, useLoading } from "@parallane/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  user?: User;
  type: "NEW" | "UPDATE";
}

const StudentForm = ({ type, user }: Props) => {
  // HOOKS
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const { imagePreview, setImagePreview } = useImagePreview(
    user?.image ?? undefined
  );

  const isUpdateType = type === "UPDATE";

  const form = useForm<StudentFormType>({
    resolver: zodResolver(studentFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
    },
  });

  const onSubmit = async (data: StudentFormType) => {
    setLoading(true);

    let res;
    if (isUpdateType) {
      res = await updateUser(data, user?.id!);
    } else {
      res = await createUser(data);
    }

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }
    if (res.success) {
      toast.success(res.success);
      router.refresh();
      router.refresh();
      setLoading(false);
      form.reset();
    }
  };

  const onDelete = async () => {
    setLoading(true);

    const res = await deleteUser(user?.id!);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
    }

    if (res.success) {
      toast.success(res.success);
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AvatarField
          control={form.control}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          image={user?.image}
          setValue={form.setValue}
          userId={user?.id}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
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
                <Input type="email" {...field} />
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
          {isUpdateType ? "Update" : "Create"}
        </Button>

        {isUpdateType && <DeleteButton onDelete={onDelete} />}
      </form>
    </Form>
  );
};

export default StudentForm;
