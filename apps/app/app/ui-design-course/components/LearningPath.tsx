import AnimatedSquarePattern from "@/components/animations/AnimatedSquarePattern";
import AnimatedTitle from "@/components/animations/AnimatedTitle";
import { Badge } from "@parallane/ui/components/ui/badge";
import { Button } from "@parallane/ui/components/ui/button";
import { ArrowDown } from "lucide-react";
import LearningPathCards from "./LearningPathCards";

const LearningPath = () => {
  return (
    <div id="journey" className="relative w-full px-4 md:px-28 p-28 ">
      <div className="pointer-events-none absolute -left-36 top-36 h-[420px] w-[420px] bg-violet-700/40 rounded-full blur-[120px]" />

      <AnimatedSquarePattern className="opacity-10 absolute left-0 top-0  pointer-events-none select-none" />

      <div className="pointer-events-none absolute -right-36 top-1/2 -translate-y-1/2 h-[420px] w-[420px] bg-primary/30 rounded-full blur-[120px]" />

      <AnimatedSquarePattern className="opacity-10 absolute -right-36 top-1/2 -translate-y-1/2  pointer-events-none select-none" />

      <div className="pointer-events-none absolute -left-36 bottom-0 h-[420px] w-[420px] bg-green-700/40 rounded-full blur-[120px]" />
      {/* <Image
        alt=""
        src={squarePatternSquare}
        width={320}
        height={320}
        className="opacity-10 absolute left-0 bottom-0 scale-125 pointer-events-none select-none"
      /> */}
      <AnimatedSquarePattern className="opacity-10 absolute left-0 bottom-0 pointer-events-none select-none" />

      <div className="space-y-28">
        <div className="flex flex-col items-center gap-4">
          <AnimatedTitle
            title="Our Journey in This Course"
            highlight="Our Journey"
            subtitle="Follow the structured learning path to master UI design step by step."
          />
        </div>

        <div>
          <div className="flex justify-center">
            <div className="border border-violet-500 p-3 rounded-md w-fit text-sm text-center">
              You Start to Become a UI Design Expert!
            </div>
          </div>
          <div className="flex justify-center items-center relative py-10">
            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-violet-500 to-green-500" />
            <LearningPathCards />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <Badge variant={"green"} className="p-2 w-full max-w-sm text-sm">
              You Made It!
            </Badge>

            <a href="#enroll" className="max-w-sm w-full">
              <Button variant={"outline"} className="w-full">
                Enroll Now
                <ArrowDown />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
