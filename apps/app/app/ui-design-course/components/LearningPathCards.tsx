"use client";

import React from "react";
import { Card } from "@parallane/ui/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

const LearningPathCards = () => {
  const getCardClasses = (isEven: boolean) => {
    return isEven ? "md:pl-0 md:pr-0" : "pl-5 pr-5 md:pr-0";
  };

  const getImageClasses = (isEven: boolean) => {
    return isEven
      ? "md:rounded-r-lg md:rounded-t-none md:rounded-tr-lg md:border-l-0"
      : "md:rounded-l-lg md:rounded-tr-none md:border-r-0";
  };

  return (
    <ul className="flex flex-col items-center gap-24 md:gap-16 w-full px-4">
      {roadMap.map((step, idx) => {
        const isEven = idx % 2 === 0;

        return (
          <li
            key={idx}
            className="w-full group max-w-screen-xl flex justify-start even:justify-end relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="md:w-1/2 relative z-10 -mx-2"
            >
              <Card
                className={`bg-slate-900 space-y-8 p-5 py-3 pb-0 md:pb-3 ${getCardClasses(isEven)}`}
              >
                <div className="flex flex-wrap md:flex-nowrap group-odd:flex-row-reverse items-center justify-center gap-5">
                  <div className={`space-y-1`}>
                    <span className="text-violet-500 text-sm font-semibold">
                      Step {idx + 1}
                    </span>
                    <h3 className="font-normal">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.explains}
                    </p>
                  </div>

                  <Image
                    alt={`Step ${idx + 1}`}
                    src={step.image}
                    width={600}
                    height={600}
                    className={`md:w-[255px] rounded-t-lg aspect-square ${getImageClasses(isEven)} object-cover border-2 border-muted`}
                  />
                </div>
              </Card>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
};

export default LearningPathCards;

const roadMap: { title: string; explains: string; image: string }[] = [
  {
    title: "Foundations of Product Design",
    explains:
      "Learn what product design really means and how UI and UX come together in real projects.",
    image: "/learningPath/img1.png",
  },
  {
    title: "UI Design Fundamentals",
    explains:
      "Master the basics: typography, spacing, contrast, hierarchy, and Gestalt principles.",
    image: "/learningPath/img2.png",
  },
  {
    title: "Color Theory",
    explains:
      "Understand color psychology, build palettes, and ensure accessibility in your designs.",
    image: "/learningPath/img3.png",
  },
  {
    title: "Get to know Figma",
    explains:
      "Learn the Figma interface, tools, and features to create stunning UI designs efficiently, all with practical projects!.",
    image: "/learningPath/img4.png",
  },
  {
    title: "Structuring UI",
    explains:
      "Learn wireframing, sketching, moodboards, and how to plan your interface effectively.",
    image: "/learningPath/img5.png",
  },
  {
    title: "Building Style Guide",
    explains:
      "Create a style guide that defines your project’s look and feel for consistency.",
    image: "/learningPath/img6.png",
  },
  {
    title: "Design Systems",
    explains:
      "Build reusable components and scalable systems for apps and websites in Figma.",
    image: "/learningPath/img7.png",
  },
  {
    title: "Designing Application",
    explains:
      "Design the complete set of screens for the Riala mobile application step by step.",
    image: "/learningPath/img8.png",
  },
  {
    title: "Designing Website",
    explains:
      "Create a landing page and supporting website for your app with modern UI practices.",
    image: "/learningPath/img9.png",
  },
  {
    title: "Responsive Design",
    explains:
      "Learn how to design interfaces that adapt beautifully to all screen sizes.",
    image: "/learningPath/img10.png",
  },
  {
    title: "Prototyping & Interactions",
    explains:
      "Turn your static designs into clickable, interactive prototypes with animations.",
    image: "/learningPath/img11.png",
  },
  {
    title: "Advanced Figma",
    explains:
      "Unlock the power of Figma’s advanced features and gain full access to project files — ready to inspect, reuse, and supercharge your workflow.",
    image: "/learningPath/img12.png",
  },
];
