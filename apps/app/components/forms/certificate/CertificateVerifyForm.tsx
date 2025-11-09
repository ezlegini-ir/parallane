"use client";

import { verifyCertificate } from "@/actions/certificate";
import { Certificate, Course, Enrollment, User } from "@parallane/database";
import { Button } from "@parallane/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@parallane/ui/components/ui/form";
import { Input } from "@parallane/ui/components/ui/input";
import { useLoading } from "@parallane/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  serialNumber: z.string().min(6),
});

type FormType = z.infer<typeof formSchema>;

interface CertificateType extends Certificate {
  enrollment: Enrollment & { user: User; course: Course };
}

const CertificateVerifyForm = () => {
  //HOOKS
  const [result, setResult] = useState<"VALID" | "INVALID" | undefined>(
    undefined
  );

  const [certificate, setCertificate] = useState<CertificateType>();
  const { loading, setLoading } = useLoading();
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      serialNumber: "",
    },
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (data: FormType) => {
    setLoading(true);
    setResult(undefined);

    if (!executeRecaptcha) {
      toast.error("Recaptcha not yet available. Please try again later.");
      setLoading(false);
      return;
    }
    const recaptchaToken = await executeRecaptcha("certificate_form");

    const res = await verifyCertificate(data.serialNumber, recaptchaToken);

    if (res.success && res.certificate) {
      toast.success(res.success);
      router.refresh();
      setLoading(false);
      setResult("VALID");
      setCertificate(res.certificate);
      form.reset();
    }

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      setResult("INVALID");
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-full max-w-sm"
      >
        {result === "VALID" ? (
          <div className="flex flex-col  justify-center items-center gap-3">
            <CheckCircle size={75} className="text-green-500" />
            <span className="font-semibold">This certificate is valid!</span>
            <div className="card w-full text-muted-foreground flex flex-col gap-3">
              <span> Student: {certificate?.enrollment.user.name} </span>
              <span> Course: {certificate?.enrollment.course?.title} </span>
              <span>
                Completed At: {formatDate(certificate?.issuedAt!, "PPP")}
              </span>
            </div>
          </div>
        ) : result === "INVALID" ? (
          <div className="flex flex-col justify-center items-center gap-3">
            <XCircle size={75} className="text-red-500" />
            This certificate is not valid!
          </div>
        ) : null}

        {result !== "VALID" && (
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      maxLength={6}
                      placeholder="6-digit Certificate Serial Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={!form.formState.isValid || loading}
              type="submit"
            >
              Verify Certificate
            </Button>
          </div>
        )}

        {result === "VALID" && (
          <div className="flex justify-center">
            <Button
              onClick={() => setResult(undefined)}
              variant={"secondary"}
              type="button"
              className="w-full"
            >
              Back
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CertificateVerifyForm;
