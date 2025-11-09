import NavBar from "@/components/NavBar";
import { database } from "@parallane/database";
import { notFound } from "next/navigation";
import CourseImpactSection from "./components/CourseImpactSection";
import CurriculumSection from "./components/CurriculumSection";
import FAQSection from "./components/FAQSection";
import HeroLanding from "./components/HeroLanding";
import Instractor from "./components/Instractor";
import LearningPath from "./components/LearningPath";
import MotiviationSection from "./components/MotiviationSection";
import PromiseSection from "./components/PromiseSection";
import PurchaseSection from "./components/PurchaseSection";
import ReviewsSection from "./components/ReviewsSection";
import VoiceoverSection from "./components/VoiceoverSection";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ reviews: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { reviews } = await searchParams;

  const course = await database.course.findUnique({
    where: { url: "ui-design-course" },
    include: {
      enrollment: {
        include: {
          classroom: true,
        },
      },
      image: true,
      review: {
        take: +(reviews || 8),
        orderBy: { id: "desc" },
        include: {
          user: true,
        },
      },
      curriculum: {
        include: {
          lessons: true,
        },
      },
      discount: true,
      gallery: {
        include: {
          image: true,
        },
      },
      tutor: {
        include: { image: true },
      },
      category: true,
      learn: true,
      prerequisite: true,
    },
  });

  if (!course) notFound();

  return (
    <div>
      <div className="space-y-20 h-screen border-b border-muted">
        <div className="max-w-screen-xl mx-auto p-4">
          <NavBar />
        </div>

        <HeroLanding
          courseSummary={course.summary}
          tizerUrl={course.tizerUrl}
        />
      </div>

      <LearningPath />

      <Instractor />

      <PromiseSection />

      <ReviewsSection />

      <CurriculumSection curriculum={course.curriculum} />

      <VoiceoverSection />

      <CourseImpactSection />

      <PurchaseSection course={course} />

      <FAQSection />

      <MotiviationSection />
    </div>
  );
};

export default page;

export const metadata: Metadata = {
  title: "UI Design Course",
  description:
    "Join the UI Design Course at parallane to master user interface design principles, tools, and techniques. Learn from industry experts and build a strong portfolio.",
  keywords: [
    "UI Design Course",
    "User Interface Design",
    "parallane",
    "Design Principles",
    "UI/UX Design",
    "Design Tools",
    "Design Techniques",
    "Design Portfolio",
    "Online Design Course",
    "Design Education",
  ],
};
