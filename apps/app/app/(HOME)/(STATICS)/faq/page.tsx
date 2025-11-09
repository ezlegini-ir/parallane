import AnimatedTitle from "@/components/animations/AnimatedTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@parallane/ui/components/ui/accordion";
import { Button } from "@parallane/ui/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

const Faq = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <AnimatedTitle
        title={"Frequently Asked Questions (FAQ)"}
        highlight="(FAQ)"
        subtitle={
          "If you have a question, you can find your answer on this page."
        }
      />

      <Accordion className="mb-12" type="single" collapsible>
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger className="text-sm">{item.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          If you did not find the answer to your question, please contact
          support.
        </p>
        <Link href={"/panel/tickets/new"}>
          <Button variant={"secondary"} size={"sm"}>
            Send Message
          </Button>
        </Link>
      </div>
    </div>
  );
};

const faqItems = [
  {
    q: "How can I download the videos?",
    a: "To comply with copyright laws and prevent unauthorized distribution of parallane courses, downloading videos is not available for users. You can watch all videos online through your account.",
  },
  {
    q: "How can I receive the course completion certificate?",
    a: "After completing 100% of the course, the completion certificate will be available for download via 'Account > Courses > Completed Courses'.",
  },
  {
    q: "How can I access the course videos?",
    a: "By logging into your account and going to the 'Courses' section, you can select your desired course and access educational content and videos through the classroom.",
  },
  {
    q: "How can I ask questions to the instructor?",
    a: "After entering the classroom via Account > Courses, you can ask your questions and receive answers from parallane instructors.",
  },
  {
    q: "How long does it take for the instructor to respond?",
    a: "The maximum response time from instructors is 48 business hours after you submit your question.",
  },
  {
    q: "Is my access to the videos time-limited?",
    a: "No, your access to course content is lifetime. You just need to go to the 'Courses' section through your account.",
  },
  {
    q: "What certificate is provided after completing the course?",
    a: "Upon successful completion of the course, an official parallane School certificate will be issued exclusively for you and can be received via your account.",
  },
  {
    q: "Is installment purchase of courses available?",
    a: "Installment purchase for some courses will be available soon. More information will be provided shortly.",
  },
];

export default Faq;

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Frequently asked questions about services, accounts, payments, and support. Quick answers to the most common user questions.",
};
