"use client";

import { createTicket } from "@/actions/ticket";
import CardBox from "@/app/panel/components/CardBox";
import { getSessionUser } from "@/data/user";
import { useFileName } from "@parallane/utils";
import { useLoading } from "@parallane/utils";
import { ticketFormSchema, TicketFormType } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import Loader from "@parallane/ui/components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@parallane/ui/components/ui/select";
import { allowedFomatsForUplaod } from "@/data/utils";
import { Textarea } from "@parallane/ui/components/ui/textarea";

const TicketForm = () => {
  // HOOKS
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const { fileName, setFileName } = useFileName();

  const form = useForm<TicketFormType>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      subject: "",
      department: "TECHNICAL",
      message: "",
      file: undefined,
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TicketFormType, "file">
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const allowedFormats = allowedFomatsForUplaod;
      const maxSize = 5 * 1024 * 1024;

      if (!allowedFormats.includes(file.type)) {
        toast.error("This format is not allowed!");
        e.target.value = "";
        return;
      }

      if (file.size > maxSize) {
        toast.error("Maximum file size is 5 MB!");
        e.target.value = "";
        return;
      }

      field.onChange(file);
      setFileName(file.name);
    }
  };

  const onSubmit = async (data: TicketFormType) => {
    setLoading(true);

    const userId = (await getSessionUser())?.id;
    if (!data || !userId) return;

    const res = await createTicket(data, userId);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    if (res.success) {
      toast.success(res.success);
      router.push(`/panel/tickets/${res.data.id}`);
    }
  };

  return (
    <CardBox title="Send New Ticket">
      <Form {...form}>
        <form className="space-y-3 " onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input className="md:w-[350px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="md:w-[350px]">
                        <SelectTrigger>
                          <SelectValue placeholder="Technical" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TECHNICAL">Technical</SelectItem>
                        <SelectItem value="FINANCE">Finance</SelectItem>
                        <SelectItem value="COURSE">Education</SelectItem>
                        <SelectItem value="SUGGEST">
                          Suggestions and Criticisms
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[200px]"
                    {...field}
                    placeholder="Please write your message here"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                {fileName ? (
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">{fileName}</span>
                    <Button
                      onClick={() => {
                        setFileName("");
                        form.setValue("file", undefined);
                      }}
                      variant={"link"}
                      size={"icon"}
                      className="w-5 h-5"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ) : (
                  <FormLabel
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <div className="flex gap-1 items-center">
                      <Link
                        size={24}
                        className="text-gray-400 hover:text-blue-500 transition pt-1"
                      />
                      <p className="flex flex-col">
                        <span className="text-xs text-gray-400 font-normal">
                          Maximum 5 MB
                        </span>
                        <span className="text-xs text-gray-400 font-normal">
                          Image or .zip
                        </span>
                      </p>
                    </div>
                  </FormLabel>
                )}
                <FormControl>
                  <Input
                    accept=".jpg,.jpeg,.png,.webp,.zip"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field)}
                    id="file-upload"
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
            Send Message
          </Button>
        </form>
      </Form>
    </CardBox>
  );
};

export default TicketForm;
