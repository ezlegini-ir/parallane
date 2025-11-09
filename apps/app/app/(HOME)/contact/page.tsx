import AnimatedTitle from "@/components/animations/AnimatedTitle";
import ContactForm from "@/components/forms/ContactForm";
import RecaptchaWrapper from "@parallane/ui/components/RecaptchaWrapper";
import SocialsIcon from "@parallane/ui/components/SocialsIcon";
import { Mail } from "lucide-react";
import { Metadata } from "next";

const page = () => {
  return (
    <div className="space-y-16">
      <AnimatedTitle
        title={"Contact with parallane Team"}
        highlight="Contact"
        subtitle={"On this page, you can contact parallane"}
      />

      <div className="flex flex-wrap md:flex-nowrap gap-10 lg:gap-20 justify-between">
        <div className="w-full lg:w-2/5 space-y-4">
          <h2 className="text-center md:text-left">Contact Methods</h2>

          <p className="text-center md:text-left text-muted-foreground">
            To receive the quickest response, please fill out the contact form
            so we can review your request quickly and accurately.
            <br />
            You can also contact us by phone or email, but we recommend filling
            out the form to get the best response. 🚀
          </p>

          <SocialsIcon />

          <div className="border rounded-sm p-3 text-sm text-muted-foreground flex justify-between items-center">
            <h3 className="text-base font-medium flex gap-2 items-center">
              <Mail size={18} />
              Email
            </h3>

            <a href="mailto:parallane.com@gmail.com">parallane.com@gmail.com</a>
          </div>
        </div>

        <div className="w-full lg:w-3/5 space-y-3">
          <h2 className="text-center md:text-left">Contact Form</h2>

          <RecaptchaWrapper
            recaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          >
            <ContactForm />
          </RecaptchaWrapper>
        </div>
      </div>
    </div>
  );
};

export default page;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "If you need support, advice, or want to collaborate, get in touch with us. parallane's contact information includes email, phone number, social networks, and contact form.",
};
