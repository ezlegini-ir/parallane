import LoginForm from "@/components/forms/login/LoginForm";
import ParallaneLogo from "@parallane/ui/components/ParallaneLogo";

const page = async () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <ParallaneLogo lightMode />

      <div className="card p-5 w-full space-y-3">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
