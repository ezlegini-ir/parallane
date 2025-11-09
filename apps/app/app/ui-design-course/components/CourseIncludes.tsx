import { Card } from "@parallane/ui/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface CourseIncludesTypes {
  label: string;
  icon: LucideIcon;
  iconColor: string;
}

interface Props {
  courseIncludes: CourseIncludesTypes[];
}

const CourseIncludes = ({ courseIncludes }: Props) => {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
        {courseIncludes.map((item, index) => (
          <li key={index}>
            <Card className="p-3 w-full flex gap-3 items-center">
              <item.icon
                size={18}
                className={`scale-125 md:scale-100 ${item.iconColor}`}
              />
              {item.label}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseIncludes;
