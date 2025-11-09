import { alirezaEzleginiProfile } from "@/public";
import { database } from "@parallane/database";
import TizerVideo from "@parallane/ui/components/TizerVideo";
import { Badge } from "@parallane/ui/components/ui/badge";
import { Button } from "@parallane/ui/components/ui/button";
import { Card, CardContent } from "@parallane/ui/components/ui/card";
import { formatPrice } from "@parallane/utils";
import { Check, Star, User, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const course = await database.course.findFirst({
    select: { price: true, tizerUrl: true },
  });

  return (
    <section className="w-full  flex items-center justify-center">
      <div className="relative w-full mx-auto">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute left-0 top-36 h-[320px] w-[320px] bg-violet-700/20 rounded-full blur-[80px]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          {/* Left: Text / CTA */}
          <div className="lg:col-span-6">
            <Badge className="mb-4">New · Complete UI Course</Badge>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Parallane —{" "}
              <span className="text-indigo-400">Where Lanes Meet Mastery.</span>
            </h1>

            <p className="text-muted-foreground mb-6 max-w-xl">
              A complete, project-based UI design course built in Figma. From
              fundamentals to advanced interactions — design real products,
              build a portfolio, and get hired. Practical, modern, and
              instructor-led with downloadable files.
            </p>

            {/* Price card */}
            <Card className="w-full mb-6">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Course Price
                  </div>
                  <div className="flex items-baseline gap-3">
                    <div className="text-2xl font-bold">
                      {formatPrice(course?.price)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/ui-design-course">
                    <Button size="lg">Course Page</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                "Projects: App & Website",
                "Figma: From basics to advanced",
                "Design system + Style Guide",
                "Responsive & interactions",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <Badge
                    variant={"green"}
                    className="w-8 h-8 rounded-full flex items-center justify-center p-1.5"
                  >
                    <Check />
                  </Badge>
                  <div className="text-sm">{f}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <Image
                src={alirezaEzleginiProfile}
                alt="Alireza Ezlegini"
                width={56}
                height={56}
                className="rounded-full border border-neutral-800"
              />
              <div>
                <div className="font-semibold">Alireza Ezlegini</div>
                <div className="text-xs text-muted-foreground">
                  Senior Web Designer & Developer
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mockup / Video preview */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Simulated video / Figma mockup */}
                <div className="bg-gradient-to-br from-slate-800 via-indigo-900 to-indigo-700 p-6 space-y-3">
                  <div className="text-xs  text-white/80">
                    · Complete Ui Design Course Trailer
                  </div>
                  <TizerVideo url={course?.tizerUrl || ""} />
                </div>
              </div>

              {/* Social proof row */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-sm text-muted-foreground h-12">
                <Card className="flex justify-center items-center gap-2 h-full">
                  <Star className="text-yellow-500" size={18} />
                  4.83/5 <div>Rating</div>
                </Card>
                <Card className="flex justify-center items-center gap-2 h-full">
                  <User className="text-primary" size={18} />
                  2,500+ students
                </Card>
                <Card className="flex justify-center items-center gap-2 h-full">
                  <Video className="text-destructive" size={18} />
                  +15 hours content
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
