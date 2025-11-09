import AnimatedTitle from "@/components/animations/AnimatedTitle";
import CertificateVerifyForm from "@/components/forms/certificate/CertificateVerifyForm";
import RecaptchaWrapper from "@parallane/ui/components/RecaptchaWrapper";
import { Metadata } from "next";

const page = () => {
  return (
    <div className="flex items-center flex-col gap-3">
      <AnimatedTitle
        title={"Certificate Verification"}
        highlight="Verification"
        subtitle={"On this page, you can verify your parallane certificate."}
      />

      <RecaptchaWrapper
        recaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      >
        <CertificateVerifyForm />
      </RecaptchaWrapper>
    </div>
  );
};

export default page;

export const metadata: Metadata = {
  title: "Certificate Verification",
  description:
    "Online verification of certificates for completed courses at parallane. Simply enter the certificate serial number to check its validity.",
};
