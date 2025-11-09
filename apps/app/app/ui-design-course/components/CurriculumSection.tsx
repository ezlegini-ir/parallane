import CourseCurriculum, {
  CurriculumType,
} from "@/app/ui-design-course/components/CourseCurriculum";
import AnimatedTitle from "@/components/animations/AnimatedTitle";
import { Card } from "@parallane/ui/components/ui/card";
import { FileText, Video } from "lucide-react";
import React from "react";

interface Props {
  curriculum: CurriculumType[];
}

const CurriculumSection = ({ curriculum }: Props) => {
  const seasons = curriculum.length;
  const lessons = curriculum.reduce(
    (acc, curr) => acc + curr.lessons.filter((l) => l.type === "VIDEO").length,
    0
  );

  const courseInfo = [
    { icon: Video, text: "Over 15+ hrs Content" },
    { icon: FileText, text: `${seasons} Seasons - ${lessons} Lessons` },
  ];

  return (
    <div className="mx-auto max-w-screen-xl space-y-20 py-28 px-3 md:px-28">
      <div className="space-y-4">
        <AnimatedTitle
          title="Deep Look at Course Curriculum"
          subtitle="Designed to build your skills step by step, layer by layer."
          highlight="Course Curriculum"
        />

        <div className="flex justify-center gap-4">
          {courseInfo.map((item, idx) => (
            <Card key={idx} className="p-3 text-sm">
              <div className="flex items-center gap-3">
                {<item.icon size={20} className="text-indigo-400" />}
                {item.text}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-screen-md mx-auto">
        <CourseCurriculum curriculums={curriculum} />
      </div>
    </div>
  );
};

export default CurriculumSection;
