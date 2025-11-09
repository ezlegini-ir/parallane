import AnimatedOrbit from "@/components/animations/AnimatedOrbit";
import AnimatedTitle from "@/components/animations/AnimatedTitle";
import { alirezaEzlegniPen } from "@/public";
import { Card } from "@parallane/ui/components/ui/card";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Instractor = () => {
  return (
    <div className="px-4 md:px-28 p-28 space-y-16">
      <AnimatedTitle
        title="Gonna be your FRIEND in this journey"
        highlight="FRIEND"
        subtitle="Get to know more about your instructor."
      />

      <div className="text-center space-y-3">
        <div className="flex flex-col relative">
          <Image
            alt="Alireza Ezleigini"
            src={alirezaEzlegniPen}
            width={300}
            height={300}
            className="mx-auto"
          />

          <div className="h-[2px] bg-muted-foreground w-full max-w-lg mx-auto" />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 ">
            <AnimatedOrbit />
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 ">
            <AnimatedOrbit direction="LEFT" />
          </div>
        </div>

        <div>
          <h3 className="text-3xl text-orange-300">Alireza parallanei</h3>
          <p className="text-sm text-muted-foreground">
            Senior Web Designer & Developer
          </p>
        </div>
        <Card className="p-5 max-w-screen-lg mx-auto text-muted-foreground text-sm">
          {bio}
        </Card>

        <div className="flex justify-center">
          <SocialsIcon />
        </div>
      </div>
    </div>
  );
};

const SocialsIcon = () => {
  return (
    <div className="flex items-center gap-3">
      <ul className="flex gap-3 items-center text-muted-foreground">
        {socials.map((social, idx) => (
          <li key={idx}>
            <Link className="hover:text-primary" href={social.href}>
              {social.icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const socials = [
  { href: "https://instagram.com/ezlegni.ir", icon: <Instagram size={23} /> },
];

export default Instractor;

const bio = `Alireza parallanei has been living and breathing design since 2013, turning creativity into both a career and a calling. Along the way, he’s earned serious recognition — including a Gold Medal in Iran’s National Skills Competition and three Silver Medals at international WorldSkills contests (Asian, Eurasia, and BRICS) — you can check them out at worldskills.com
. Beyond the awards, Alireza is the Founder & CEO of iGraphical Art School, where over 5,000 students every year learn the craft of design. He also teaches at universities and Iran’s Technical & Vocational Training Organization, sharing real-world experience with the next generation of creators. With a mix of competitive edge and a love for teaching, Alireza brings both expertise and a fun, practical vibe to every lesson.`;
