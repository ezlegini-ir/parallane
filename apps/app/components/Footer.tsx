import SocialsIcon from "@parallane/ui/components/SocialsIcon";
import { Separator } from "@parallane/ui/components/ui/separator";
import { Copyright } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="pt-20 px-4 space-y-2 w-full max-w-screen-xl mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full space-y-4 md:space-y-0">
          <ul className="flex flex-wrap justify-between md:justify-start gap-4 md:gap-8 text-sm">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center md:justify-end">
            <SocialsIcon />
          </div>
        </div>
      </div>

      <Separator />

      <div className="text-xs md:flex-row flex-col items-center gap-3 text-muted-foreground flex justify-between">
        <p className="text-center md:text-left">
          Read{" "}
          <Link href="/terms-and-conditions" className="underline">
            Terms and Privacy Policy
          </Link>{" "}
          of parallane.com
        </p>

        <p className="flex items-center justify-center md:justify-start gap-2">
          <Copyright size={18} />
          All rights reserved for parallane.com
        </p>
      </div>
    </div>
  );
};

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Validate Certificate", href: "/verify-cert" },
];

export default Footer;
