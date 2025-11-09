"use client";

import { createContact } from "@/actions/contact";
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
import { useLoading } from "@parallane/utils";
import { contactFormSchema, ContactFormType } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@parallane/ui/components/ui/textarea";

const ContactForm = () => {
  // HOOKS
  const { loading, setLoading } = useLoading();

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
      subject: "",
    },
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (data: ContactFormType) => {
    setLoading(true);

    if (!executeRecaptcha) {
      toast.error("Recaptcha not yet available, please try again later.");
      setLoading(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha("contact_form");

    const res = await createContact(data, recaptchaToken);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    if (res.success) {
      toast.success(res.success);
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-1 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
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
                  <Input className="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="block w-full min-h-[160px] border rounded-md p-3 focus:border-blue-500 focus:ring-0.5 focus:ring-blue-500 focus:outline-none"
                  placeholder="Please write your message here..."
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
  );
};

export default ContactForm;
