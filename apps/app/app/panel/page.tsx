import Slider from "@/components/Slider";
import { getSessionUser } from "@/data/user";
import { wallet as walletPic } from "@/public";
import { database } from "@parallane/database";
import { formatPrice } from "@parallane/utils";
import Image from "next/image";
import LastTicketsList from "./components/LastTicketsList";
import RunningCourses from "./components/RunningCourses";
import StatusCardsGrid from "./components/StatusCardsGrid";

const page = async () => {
  const userId = (await getSessionUser())?.id;

  const runningEnrollment = await database.enrollment.findMany({
    orderBy: { enrolledAt: "desc" },
    where: {
      userId: userId,
      completedAt: null,
    },
    include: {
      course: {
        include: {
          enrollment: {
            where: { userId },
            include: {
              classroom: true,
            },
          },
          image: true,
          tutor: true,
          curriculum: {
            include: {
              lessons: {
                include: {
                  lessonProgress: {
                    where: { userId },
                  },
                },
              },
            },
          },
        },
      },
    },
    take: 3,
  });

  const runningCourses = runningEnrollment.map((item) => item.course);

  const tickets = await database.ticket.findMany({
    where: {
      userId: userId,
    },
  });

  const wallet = await database.wallet.findFirst({
    where: { userId },
  });

  const sliders = await database.slider.findMany({
    where: { type: "PANEL", active: true },
    include: { image: true },
  });

  return (
    <div className="space-y-4">
      <Slider type="PANEL" sliders={sliders} />

      <div className="grid grid-cols-2 lg:grid-cols-4  gap-3 justify-between">
        <StatusCardsGrid />

        <div className="card px-4 flex flex-col lg:flex-row gap-3 items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-primary font-medium text-sm">
              Wallet Balance
            </span>
            <span className="font-medium text-xl">
              {formatPrice(wallet?.balance || 0)}
            </span>
          </div>
          <Image
            alt="Wallet"
            src={walletPic}
            width={75}
            height={75}
            className="pointer-events-none"
          />
        </div>
      </div>

      <div className="grid gap-3 grid-cols-1 xl:grid-cols-8">
        <div className="xl:col-span-6">
          <RunningCourses runningCourses={runningCourses} showBtn />
        </div>
        <div className="xl:col-span-2">
          <LastTicketsList tickets={tickets} />
        </div>
      </div>
    </div>
  );
};

export default page;
