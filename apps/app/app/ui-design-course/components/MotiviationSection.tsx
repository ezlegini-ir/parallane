import AnimatedTitle from "@/components/animations/AnimatedTitle";
import { alirezaEzleginiPointing } from "@/public";
import Image from "next/image";
import React from "react";

const MotiviationSection = () => {
  return (
    <div className="py-28 px-4 md:px-28 max-w-screen-2xl mx-auto">
      <div className="flex flex-wrap md:flex-nowrap items-center md:gap-10">
        <div className="md:w-1/3">
          <Image
            alt="Alireza Ezlegini"
            src={alirezaEzleginiPointing}
            width={400}
            height={400}
            className="mb-8"
          />
        </div>

        <div className="space-y-6 md:w-2/3">
          <div className="hidden md:block">
            <AnimatedTitle
              textDir="LEFT"
              title="You Can Make it, As I did 12 years ago!"
              highlight="You Can Make it"
            />
          </div>
          <div className="md:hidden">
            <AnimatedTitle
              textDir="CENTER"
              title="You Can Make it, As I did 12 years ago!"
              highlight="You Can Make it"
            />
          </div>

          <p className="text-muted-foreground md:text-left text-justify px-4 md:px-0">
            <span className="text-2xl">"</span>
            <span>{motivationText}</span>
            <span className="text-2xl">"</span>
          </p>

          <div>
            <p>Alireza Ezlegini</p>
            <p className="text-muted-foreground text-xs">
              Senior Web Designer & Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotiviationSection;

const motivationText =
  "I’ve put all my effort into creating this page to introduce you to the best UI design course (YES, I'm a developer too), a project that took over 7 months to create and release. But in reality, it’s taken me more than 14 years to acquire the knowledge that this course offers. This course is the result of all the experiences and challenges I’ve faced in the design industry over the years. All those years have been filled with valuable lessons and experiences that I now want to share with you. I hope this course helps you kickstart your career and elevate your skills to the level you’ve always dreamed of. Start here, and move forward — nothing is impossible when you have both knowledge and perseverance.";
