"use client";

import AnimatedFigmaCursor from "@/components/animations/AnimatedFigmaCursor";
import AnimatedFigmaLogo from "@/components/animations/AnimatedFigmaLogo";
import { Badge } from "@parallane/ui/components/ui/badge";
import { motion } from "framer-motion";

const CourseTitle = ({
  title,
  summery,
}: {
  title: string;
  summery: string;
}) => {
  return (
    <div className="relative w-fit mx-auto">
      <div className="absolute left-0 top-0 w-20">
        <AnimatedFigmaLogo />
      </div>

      <div className=" space-y-3 max-w-2xl mx-auto flex items-center flex-col text-center">
        <Badge variant={"blue"} className="w-fit">
          🔥 2,500+ Students Enrolled
        </Badge>
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Complete{" "}
            <span className="title-gradient">UI Design Course (Figma)</span>{" "}
            From Basics to Advanced
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
        >
          <p className="mt-3 text-muted-foreground">{summery}</p>
        </motion.div>
      </div>

      <div className="absolute right-0 bottom-0 w-20">
        <AnimatedFigmaCursor />
      </div>
    </div>
  );
};

export default CourseTitle;
