import LoginForm from "@/components/forms/login/LoginForm";
import parallaneLogo from "@parallane/ui/components/parallaneLogo";
import { Card } from "@parallane/ui/components/ui/card";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <Link href={"#"}>
        <parallaneLogo lightMode />
      </Link>

      <Card className="p-5 w-full space-y-3">
        <LoginForm />
      </Card>
    </div>
  );
};

export default page;
