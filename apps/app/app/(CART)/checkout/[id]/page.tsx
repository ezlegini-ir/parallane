import CheckoutForm from "@/components/forms/CheckoutForm";
import { getSessionUser } from "@/data/user";
import { database } from "@parallane/database";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
  const user = await getSessionUser();
  const { id } = await params;

  const course = await database.course.findUnique({
    where: { id: +id },
    include: {
      enrollment: true,
      image: true,
      discount: true,
      tutor: {
        include: { image: true },
      },
    },
  });

  if (!course) return notFound();

  const userId = (await getSessionUser())?.id;

  const wallet = await database.wallet.findFirst({
    where: { userId },
  });

  return (
    <div>
      <CheckoutForm user={user!} course={course} wallet={wallet} />
    </div>
  );
};

export default page;
