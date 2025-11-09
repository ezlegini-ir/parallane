"use client";

import { Badge } from "@parallane/ui/components/ui/badge";
import { Button } from "@parallane/ui/components/ui/button";
import { formatDate } from "date-fns";
import { UserRoundPlus } from "lucide-react";
import Link from "next/link";

const CourseRegisterButton = ({
  courseId,
  isUserEnrolled,
  isPresale,
  releaseDate,
}: {
  courseId: number;
  isUserEnrolled: boolean;
  isPresale: boolean;
  releaseDate: Date | null;
}) => {
  return (
    <>
      {!isUserEnrolled && (
        <div className="space-y-3 ">
          <div className="flex gap-3">
            <Link className="w-full" href={`/checkout/${courseId}`}>
              <Button
                size={"lg"}
                variant={isPresale ? "dark" : "indigo"}
                className="w-full hover:shadow-[0_0_80px_rgba(99,102,241,0.5)] transition-all text-base"
              >
                <UserRoundPlus className="scale-110" />
                {isPresale ? "Preenroll" : "Enroll Now"}
              </Button>
            </Link>

            {isPresale && releaseDate && (
              <Badge variant="blue" className="w-full gap-1">
                <span>Publish Date:</span>
                <span>{formatDate(releaseDate, "PPP")}</span>
              </Badge>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseRegisterButton;
