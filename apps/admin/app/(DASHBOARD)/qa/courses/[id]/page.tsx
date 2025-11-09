import Avatar from "@parallane/ui/components/Avatar";
import Pagination from "@parallane/ui/components/Pagination";
import Search from "@parallane/ui/components/Search";
import { Button } from "@parallane/ui/components/ui/button";
import { getCourseById } from "@/data/course";
import { pagination } from "@parallane/utils";
import { database } from "@parallane/database";
import {
  AskTutor,
  AskTutorMessages,
  Image as ImageType,
  Prisma,
  Tutor,
  User,
} from "@parallane/database";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ search: string; page: string }>;
}
const page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { search, page } = await searchParams;

  const where: Prisma.AskTutorWhereInput = {
    courseId: +id,
    user: search
      ? {
          email: { contains: search },
        }
      : undefined,
  };

  const { skip, take } = pagination(page);
  const course = await getCourseById(id);
  const qa = await database.askTutor.findMany({
    where,
    include: {
      user: true,
      tutor: {
        include: {
          image: true,
        },
      },
      messages: {
        orderBy: { id: "desc" },
      },
    },

    skip,
    take,
  });
  const totalQa = await database.askTutor.count({ where });

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h3>{course?.title}</h3>

        <Search placeholder="Search Users..." />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {qa.map((item, index) => (
          <QaCard key={index} qa={item} />
        ))}
      </div>

      <Pagination pageSize={16} totalItems={totalQa} />
    </div>
  );
};

export default page;

export interface QaType extends AskTutor {
  tutor: Tutor & { image: ImageType | null };
  user: User;
  messages: AskTutorMessages[] | null;
}

interface QaProps {
  qa: QaType | null;
}

const QaCard = ({ qa }: QaProps) => {
  return (
    <div className="card">
      <div className="flex gap-3 items-center justify-between">
        <div className="border-4 rounded-full">
          <Avatar src={qa?.tutor.image?.url} size={100} />
        </div>

        <div className="w-full border" />

        <div className="border-4 rounded-full">
          <Avatar src={qa?.user.image} size={100} />
        </div>
      </div>

      <div className="flex justify-between text-gray-500 text-sm">
        <span>{qa?.tutor.name}</span>
        <span>{qa?.user.name}</span>
      </div>

      <div className="p-2 px-3 bg-slate-50 border rounded-md text-sm w-full text-muted-foreground">
        {qa?.messages?.[0]?.message.slice(0, 50)}...
      </div>

      <div>
        <Link href={`/qa/courses/${qa?.courseId}/message/${qa?.id}`}>
          <Button variant={"outline"} className="w-full">
            View Messages
          </Button>
        </Link>
      </div>
    </div>
  );
};
