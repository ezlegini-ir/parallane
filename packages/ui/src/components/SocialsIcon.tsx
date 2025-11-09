import { Youtube, Instagram } from "lucide-react";
import Link from "next/link";

const SocialsIcon = () => {
  return (
    <div className="flex items-center gap-3">
      <p className="text-muted-foreground text-xs">Join Us:</p>
      <ul className="flex gap-3 items-center text-muted-foreground">
        {socials.map((social) => (
          <li key={social.href}>
            <Link href={social.href}>{social.icon}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const socials = [
  { href: "https://youtube.com/@parallane", icon: <Youtube size={23} /> },
  { href: "https://instagram.com/parallane.co", icon: <Instagram size={23} /> },
];

export default SocialsIcon;
