import { Badge } from "@parallane/ui/components/ui/badge";
import { Card } from "@parallane/ui/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface courseContentItemsType {
  title: string;
  content: string[];
  icon: LucideIcon;
}

interface Props {
  courseContentItems: courseContentItemsType[];
}

const CourseAudienceItems = ({ courseContentItems }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courseContentItems?.map((item, idx) => (
        <Card key={idx} className="p-5 space-y-2">
          <div className="flex items-center gap-3">
            <Badge variant={"blue"} className="w-9 h-9 rounded-full p-2">
              <item.icon />
            </Badge>
            <h4 className="font-semibold">{item.title}</h4>
          </div>
          <ul className="text-muted-foreground list-disc list-inside">
            {item.content.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
};

export default CourseAudienceItems;
