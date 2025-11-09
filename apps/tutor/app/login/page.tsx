import LoginForm from "@/components/forms/login/LoginForm";
import parallaneLogo from "@parallane/ui/components/parallaneLogo";

const page = async () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <parallaneLogo lightMode />

      <div className="card p-5 w-full space-y-3">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
