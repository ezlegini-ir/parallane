import CourseIncludes, {
  CourseIncludesTypes,
} from "@/app/ui-design-course/components/CourseIncludes";
import CourseRegister from "@/app/ui-design-course/components/CourseSidebar";
import AnimatedTitle from "@/components/animations/AnimatedTitle";
import { squarePatternSquare } from "@/public";
import {
  ClassRoom,
  Course,
  CourseCategory,
  Curriculum,
  Discount,
  Enrollment,
  GalleryItem,
  Image as ImageType,
  Learn,
  Lesson,
  Prerequisite,
  Review,
  Tutor,
  User,
} from "@parallane/database";
import {
  Award,
  FileText,
  LifeBuoy,
  MessageCircle,
  Subtitles,
  TvMinimalPlay,
} from "lucide-react";
import Image from "next/image";

export interface CourseType extends Course {
  enrollment: (Enrollment & { classroom: ClassRoom | null })[];
  tutor: (Tutor & { image: ImageType | null }) | null;
  image: ImageType | null;
  learn: Learn[];
  review: (Review & { user: User })[];
  category: CourseCategory | null;
  prerequisite: Prerequisite[];
  discount: Discount | null;
  curriculum: (Curriculum & { lessons: Lesson[] })[];
  gallery: (GalleryItem & { image: ImageType[] }) | null;
}

interface Props {
  course: CourseType;
}

const PurchaseSection = ({ course }: Props) => {
  // const duration = formatDuration(course.duration);
  const seasons = course.curriculum.length;
  const lessons = course.curriculum.reduce(
    (acc, curr) => acc + curr.lessons.filter((l) => l.type === "VIDEO").length,
    0
  );

  const courseIncludes: CourseIncludesTypes[] = [
    {
      label: `15+ hrs Content`,
      icon: TvMinimalPlay,
      iconColor: "text-primary",
    },
    {
      label: `${seasons} Seasons - ${lessons} Lessons`,
      icon: FileText,
      iconColor: "text-foreground",
    },
    {
      label: `English Subtitles`,
      icon: Subtitles,
      iconColor: "text-destructive",
    },
    {
      label: `Includes certificate`,
      icon: Award,
      iconColor: "text-yellow-400",
    },
    {
      label: `Direct chat with tutor`,
      icon: MessageCircle,
      iconColor: "text-pink-400",
    },
    {
      label: `Lifetime & Unlimited Free Access`,
      icon: LifeBuoy,
      iconColor: "text-green-400",
    },
  ];

  return (
    <div
      id="enroll"
      className="py-28 px-4 md:px-0 overflow-hidden  border-b border-t border-muted relative"
    >
      <div className="pointer-events-none absolute md:-right-36 md:top-1/2 md:-translate-y-1/2 -top-36 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto  h-[420px] w-[420px] bg-indigo-500/30 rounded-full blur-[120px]" />
      <Image
        alt=""
        src={squarePatternSquare}
        width={320}
        height={320}
        className="opacity-10 absolute md:-right-36 md:top-1/2 md:-translate-y-1/2 -top-36 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto scale-125 pointer-events-none select-none"
      />
      <div className="pointer-events-none absolute -left-36 top-1/2 -translate-y-1/2 hidden md:block h-[420px] w-[420px] bg-indigo-500/30 rounded-full blur-[120px]" />
      <Image
        alt=""
        src={squarePatternSquare}
        width={320}
        height={320}
        className="opacity-10 absolute -left-36 top-1/2 -translate-y-1/2  scale-125 pointer-events-none select-none hidden md:block"
      />

      <div className="mx-auto space-y-8">
        <AnimatedTitle
          title="Start Your UI/UX Journey Today"
          highlight="UI/UX Journey"
          subtitle="Enroll now and get lifetime access, unlimited support, and a certificate to showcase your skills."
        />

        <div className="flex gap-10 justify-center">
          <p className="flex flex-col items-center">
            <span className="text-3xl font-semibold title-gradient">
              +2,500
            </span>
            <span className="text-muted-foreground text-sm">Student</span>
          </p>

          <p className="flex flex-col items-center">
            <span className="text-3xl font-semibold bg-gradient-to-r from-orange-400  to-orange-600 bg-clip-text text-transparent">
              4.83
            </span>
            <span className="text-muted-foreground text-sm">Rating</span>
          </p>
        </div>

        <div className="space-y-3 max-w-screen-sm mx-auto">
          <CourseRegister course={course} />

          <CourseIncludes courseIncludes={courseIncludes} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseSection;
