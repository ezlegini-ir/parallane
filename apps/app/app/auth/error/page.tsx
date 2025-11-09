import { authErrorScreen } from "@/public";
import { Button } from "@parallane/ui/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        alt="Error"
        src={authErrorScreen}
        width={600}
        height={600}
        className="mb-5"
      />

      <div className="text-center space-y-3">
        <h2>Something Happened While Authenticating User!</h2>
        <p className="text-sm text-muted-foreground">Please Try again later!</p>
        <div>
          <Link href={"/"}>
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
