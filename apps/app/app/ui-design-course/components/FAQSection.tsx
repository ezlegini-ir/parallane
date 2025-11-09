import AnimatedTitle from "@/components/animations/AnimatedTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@parallane/ui/components/ui/accordion";
import React from "react";

const FAQSection = () => {
  return (
    <div className="py-28 px-4 md:px-28 space-y-16">
      <AnimatedTitle
        title="Frequently Asked Questions (FAQ)"
        highlight="(FAQ)"
        subtitle="Everything you need to know before getting started with the course."
      />

      <div className="max-w-screen-md mx-auto">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {faqList.map((faq, index) => (
            <AccordionItem key={index} value={(index + 1).toString()}>
              <AccordionTrigger
                value={index}
                className="text-base text-left hover:no-underline"
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;

const faqList = [
  {
    q: "What’s included in the course?",
    a: "The course includes 14 chapters, real-world projects, lifetime access, downloadable Figma files, and unlimited support.",
  },
  {
    q: "Do I need prior design experience?",
    a: "No! This course is designed for beginners. All you need is basic computer skills and a passion for learning.",
  },
  {
    q: "How long will it take to complete the course?",
    a: "The course is self-paced, but most students complete it within 2-4 months, depending on the time they dedicate. We've had students finish in as little as 5 weeks! All Dependes on you. But Our Suggestion is 2-3 months.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes, you will receive a certificate of completion once you finish the course!",
  },
  {
    q: "What if I have questions during the course?",
    a: "You’ll have unlimited access to tutor support via direct messaging. We’re here to help you succeed! not only during the course but even after you complete it. we won't leave you alone.",
  },
  {
    q: "Can I use Figma for free?",
    a: "Yes, Figma offers a free plan that works perfectly for this course. You can use all the tools you need without a paid subscription.",
  },
  {
    q: "How long takes to get answer from tutor?",
    a: "Maximum 48 hours during weekdays. usually much faster than that. (Usally within a few hours)",
  },
  {
    q: "How long takes to get answer from support team?",
    a: "Maximum 12 hours during weekdays. usually much faster than that. (Usally within two hours)",
  },
  {
    q: "Is there any way to get a refund?",
    a: "Unfortunately, we don't offer refunds, but we do offer unlimited support to ensure you’re fully satisfied with your learning experience.",
  },
  {
    q: "Do I need any special software or equipment?",
    a: "All you need is a computer with a modern browser and a free Figma account. No other special tools are required. Though having a basic understanding of Adobe Photoshop or Illustrator can be helpful but not mandatory. (We won't engage with these tools in this course.)",
  },
  {
    q: "Can I access the course on mobile?",
    a: "While the course is designed for desktop use, you can access it on mobile for reading or watching videos. It’s best on a larger screen for design work.",
  },
  {
    q: "Do i have a lifetime access to the course?",
    a: "Yes! After purchasing the course, you will have lifetime access to all the materials, including any future updates or additions.",
  },
  {
    q: "Do we have any complementary docs?",
    a: "Yes! We provide complementary resources, including design templates, cheat sheets, and additional reading materials to enhance your learning experience.",
  },
];
