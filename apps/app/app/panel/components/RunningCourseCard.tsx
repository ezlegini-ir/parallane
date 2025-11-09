import { placeHolder } from "@/public";
import { Button } from "@parallane/ui/components/ui/button";
import { Progress } from "@parallane/ui/components/ui/progress";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  progress: number;
  title: string;
  tutor: string;
  imageUrl?: string;
  classroomUrl: string;
  remainingLessons: number;
}

const RunningCourseCard = ({
  progress,
  remainingLessons,
  title,
  tutor,
  imageUrl,
  classroomUrl,
}: Props) => {
  return (
    <div className="card py-3">
      <div className="space-y-5">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Image
              alt=""
              src={imageUrl || placeHolder}
              width={85}
              height={85}
              className="rounded-md object-cover aspect-video"
            />

            <Link href={classroomUrl}>
              <p className="font-medium">{title}</p>
              <p className="text-xs text-gray-500">{tutor}</p>
            </Link>
          </div>

          <div className="hidden md:flex gap-2 h-min items-center">
            <Link href={classroomUrl}>
              <Button variant={"lightBlue"} size={"sm"} className="h-7">
                Classroom <MoveRight />
              </Button>
            </Link>
          </div>
        </div>

        {progress !== 100 && (
          <div className="space-y-1.5">
            <Progress value={progress} />
            <div
              dir="ltr"
              className="text-xs text-gray-500 flex justify-between"
            >
              <div className="space-x-2">
                <span>%{progress?.toFixed()}</span>
                {/* <span>-</span> */}
                {/* <span >{completedLessons} sessions</span> */}
              </div>

              <div>{remainingLessons} sessions left</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunningCourseCard;
