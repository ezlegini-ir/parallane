import { getEnrollmentByUserIdAndCourseId } from "@/data/enrollment";
import { getSessionUser } from "@/data/user";
import Price from "@parallane/ui/components/Price";
import { Button } from "@parallane/ui/components/ui/button";
import { Card } from "@parallane/ui/components/ui/card";
import { TvMinimalPlay } from "lucide-react";
import Link from "next/link";
import CourseRegisterButton from "./CourseRegisterButton";
import { CourseType } from "./PurchaseSection";

interface Props {
  course: CourseType;
}

const CourseRegister = async ({ course }: Props) => {
  const userId = (await getSessionUser())?.id;
  const enrollment = await getEnrollmentByUserIdAndCourseId(
    userId || 0,
    course.id
  );

  const isUserEnrolled = !!enrollment;
  const classroomId = enrollment?.classroom?.id;

  return (
    <div className="order-first md:order-last md:sticky top-16 self-start space-y-3 ">
      <Card className="p-5 space-y-6">
        {!isUserEnrolled && (
          <div className="flex justify-between items-end">
            <Price
              basePrice={course.basePrice}
              discount={!!course.discount}
              price={course.price}
            />

            <p className="text-sm text-muted-foreground">(One Time Fee)</p>
          </div>
        )}
        {!isUserEnrolled ? (
          <div className="space-y-3">
            <CourseRegisterButton
              isPresale={course.status === "PRESALE"}
              releaseDate={course.releaseDate}
              isUserEnrolled={isUserEnrolled}
              courseId={course.id}
            />
          </div>
        ) : (
          <div>
            <Link href={`/classroom/${classroomId}`}>
              <Button variant={"lightBlue"} className="w-full">
                <TvMinimalPlay size={22} />
                Enter Classroom
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CourseRegister;
