import AnimatedTitle from "@/components/animations/AnimatedTitle";
import { alirezaparallaneiProfile, sketchVideo } from "@/public";
import Avatar from "@parallane/ui/components/Avatar";
import { Badge } from "@parallane/ui/components/ui/badge";
import { Button } from "@parallane/ui/components/ui/button";
import { ArrowDown, Check } from "lucide-react";

const PromiseSection = () => {
  return (
    <div className="relative w-full min-h-screen my-28 md:my-0">
      <video
        src={sketchVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-15 bg-muted hidden md:block"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center p-4 space-y-10 md:space-y-16">
        <AnimatedTitle
          title="I Promise you at the end of this course, you will:"
          highlight="I Promise you"
        />

        <div className="w-full md:w-2/3 mx-auto md:columns-2 space-y-3">
          {promises.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <Badge
                variant={"green"}
                className="w-7 h-7 rounded-full flex items-center justify-center p-1.5"
              >
                <Check strokeWidth={3} />
              </Badge>
              <div className="text-muted-foreground text-sm md:text-base">
                {item}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <Avatar src={alirezaparallaneiProfile} size={35} />
            <p className="text-center md:text-left">
              "See? I meant it when I said A Complete Course! 😎"
            </p>
          </div>

          <a href="#enroll">
            <Button variant="gold" className="flex items-center gap-2">
              Enroll Now <ArrowDown />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromiseSection;

const promises: string[] = [
  "Understand the difference between UI, UX, and product design.",
  "Apply contrast, hierarchy, grids, typography, and Gestalt rules.",
  "Work confidently in Figma: auto-layout, components, variants, and handoff.",
  "Master color theory, palettes, gradients, and accessibility.",
  "Plan projects with wireframes, sketches, moodboards, and user flows.",
  "Create style guides and scalable design systems in Figma.",
  "Design a complete mobile app project (Riala app).",
  "Build a responsive website project (Riala website).",
  "Adapt designs across desktop, tablet, and mobile devices.",
  "Prototype with animations, carousels, and interactive flows.",
  "Use advanced Figma features: Dev Mode, Variables, Libraries, Dark Mode.",
  "Leverage plugins like Unsplash, Lucide, and color generators.",
  "Export assets and hand off projects professionally.",
  "Build a portfolio with real app and website projects.",
  "Gain confidence to work as a UI/UX designer locally or internationally.",
  "Have the ability to work with development teams and understand their needs.",
];
