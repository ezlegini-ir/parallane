import RadialProgress from "@/app/panel/components/RadialProgress";
import { getSessionUser } from "@/data/user";
import { database } from "@parallane/database";
import StatusCard from "./StatusCard";

const StatusCardsGrid = async () => {
  const userId = (await getSessionUser())?.id;

  const enrolledCourses = await database.enrollment.count({
    where: { userId },
  });
  const completedCourses = await database.enrollment.count({
    where: { userId, completedAt: { not: null } },
  });
  const leftToComplete = enrolledCourses - completedCourses;

  const submittedCertificates = await database.certificate.count({
    where: { enrollment: { userId } },
  });

  const totalTickets = await database.ticket.count({
    where: { userId },
  });
  const solvedTickets = await database.ticket.count({
    where: { userId, status: "CLOSED" },
  });
  const pendingTickes = await database.ticket.count({
    where: { userId, status: "PENDING" },
  });

  const statusData = [
    {
      title: "Progress",
      trigger: `${completedCourses} / ${enrolledCourses} Courses`,
      subTitle: `${leftToComplete} Remaining Courses`,
      chart: (
        <RadialProgress
          count={completedCourses}
          totalCount={enrolledCourses}
          fill="primary"
        />
      ),
    },
    {
      title: "Certifications",
      trigger: `${submittedCertificates} Certified`,
      subTitle: `Out of ${enrolledCourses} Courses`,

      chart: (
        <RadialProgress
          count={submittedCertificates}
          totalCount={enrolledCourses}
          fill="yellow"
        />
      ),
    },
    {
      title: "Solved Tickets",
      trigger: `${solvedTickets} From ${totalTickets}`,
      subTitle: `${pendingTickes} Tickets Pending`,
      chart: (
        <RadialProgress
          count={solvedTickets}
          totalCount={totalTickets}
          fill="green"
        />
      ),
    },
  ];

  return (
    <>
      {statusData.map((status, index) => (
        <StatusCard key={index} status={status} />
      ))}
    </>
  );
};

export default StatusCardsGrid;
