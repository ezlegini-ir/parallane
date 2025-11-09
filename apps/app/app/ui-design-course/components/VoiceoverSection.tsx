import AnimatedTitle from "@/components/animations/AnimatedTitle";
import { alirezaEzleginiPodcast } from "@/public";
import { Badge } from "@parallane/ui/components/ui/badge";
import { Button } from "@parallane/ui/components/ui/button";
import { AlignLeft, ArrowDown, Brain, Headphones, Video } from "lucide-react";
import Image from "next/image";

const VoiceoverSection = () => {
  return (
    <div className="py-28 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-10 md:gap-3">
        <div className="relative">
          <Image
            alt="Alireza Ezlegini"
            src={alirezaEzleginiPodcast}
            width={575}
            height={275}
          />

          <div className="w-96 h-96 rounded-full blur-2xl absolute bg-indigo-500 opacity-15 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10" />
        </div>
        <div className="space-y-8 px-4 md:px-0">
          <div className="hidden md:block">
            <AnimatedTitle
              textDir="LEFT"
              title={voiceoverSection.title}
              highlight="Voiceovers"
              subtitle={voiceoverSection.subtitle}
            />
          </div>
          <div className="md:hidden">
            <AnimatedTitle
              textDir="CENTER"
              title={voiceoverSection.title}
              highlight="Voiceovers"
              subtitle={voiceoverSection.subtitle}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {voiceoverSection.benefits.map((item, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <Badge
                  variant={"blue"}
                  className="aspect-square p-1.5 rounded-full mb-2"
                >
                  <item.icon size={18} />
                </Badge>
                <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          <div>
            <a href="#enroll">
              <Button className="w-full md:w-fit" variant={"gold"}>
                Enroll Now <ArrowDown />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceoverSection;

const voiceoverSection = {
  title: "All Recorded with Voiceovers",
  subtitle:
    "All lessons are recorded with scripted voiceovers, paired with motion graphics and Screen Records for clearer, more effective learning.",
  benefits: [
    {
      title: "Clear & Structured",
      text: "Scripted lessons mean clear, focused explanations.",
      icon: AlignLeft,
    },
    {
      title: "Better Focus",
      text: "Stay focused on key concepts without distractions.",
      icon: Headphones,
    },
    {
      title: "Higher Retention",
      text: "Syncing audio with visuals boosts memory and understanding.",
      icon: Brain,
    },
    {
      title: "Professional Quality",
      text: "Experience high-quality, engaging lessons like a professional course.",
      icon: Video,
    },
  ],
};
