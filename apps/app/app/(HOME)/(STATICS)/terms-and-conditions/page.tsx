import AnimatedTitle from "@/components/animations/AnimatedTitle";
import Title from "@parallane/ui/components/Title";
import { Metadata } from "next";

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <AnimatedTitle
        title={"parallane's Terms and Privacy Policy"}
        subtitle={
          "By registering on the parallane website, you accept parallane's terms and conditions for using the services of this platform. Below are some of the important rules of parallane:"
        }
      />

      <div className="space-y-3 mb-6 text-sm">
        <Title title="Rules" className="text-xl" />
        {rules.map((rule, index) => (
          <p className="card" key={index}>
            {rule}
          </p>
        ))}
      </div>

      <div className="space-y-3 text-sm">
        <Title title="User Privacy" className="text-xl" />
        <div className="card text-sm">
          <pre className="text-sm"> {privacy}</pre>
        </div>
      </div>
    </div>
  );
};

const rules = [
  "Any distribution, reproduction, redistribution, sale, or commercial exploitation of the course content and materials on the parallane website, in any form or platform, is prohibited and will be subject to legal action.",
  "By registering on the parallane website, the user agrees that if they violate the website's rules, parallane has the right to block the user's access and pursue legal action through official authorities and the company's lawyer.",
  "Access to the courses is only available online, and any downloading, screen recording, or distribution of course content by users is prohibited and unauthorized.",
  "Each purchase is solely for the personal and individual use of the buyer, and the user is not permitted under any circumstances to share their account, even with family members.",
  "By registering on the site, the user consents to receive notifications and related messages from parallane By email, SMS, or other communication methods.",
  "The responsibility for the accuracy of the entered information, including the name, surname, and national ID number, lies with the user. If a certificate is issued with incorrect information, parallane will not be responsible for correcting or reissuing the document.",
  "By submitting feedback or participating in the content on the site, the user gives parallane permission to publish their profile picture and display name on the website and the official social media channels of the platform.",
  "Any attempt to infiltrate, hack, manipulate, or disrupt the technical systems or content of the website will be considered a violation and will lead to legal action.",
  "Refunds are only possible in cases where a serious flaw in access or quality of the courses is proven by parallane, and the review will be based on the support team's decision.",
  "All intellectual property rights and ownership of the courses and content provided belong to parallane, and any use outside the established framework will be considered a violation of the author’s rights.",
  "If the payment fails for any reason but the amount is deducted from the user's account, the user must contact parallane support to resolve the issue. parallane is not responsible for any delays or issues arising from payment gateways or banks.",
  "Users from North Korea, Iran, Syria, Cuba, and Sudan are not allowed to have any payment methods on the parallane platform due to international sanctions and regulations.",
  "Users from United States of America are not allowed to have any payment methods on the parallane unless they use a VPN to mask their location due to international sanctions and regulations. They should use a VPN to access the platform, like X-VPN, NordVPN, or any other reliable VPN service.",
  "User's address, city and postal code are required to start the purchase process on parallane platform.",
  "When a degree or certificate is issued, it will include the user's full name as registered on the platform. Therefore, users must ensure that their name is entered correctly during registration to avoid any discrepancies in the issued documents. new certificates will not be issued for name correction.",
];

const privacy = `The privacy of users on the parallane website is a top priority. We are committed to fully protecting users' personal information and providing a secure environment for using the site's services. To achieve this, we use various encryption technologies for transmitting data between the user and the server to prevent unauthorized access.

The information we collect from users is used solely to provide better and more accurate services, and no personal information will be shared or sold to third parties.

parallane only requests information from you that is necessary for providing the required services, and any use of user information outside of the scope of these services is unauthorized by parallane.

We continually strive to create a safer environment for our valued users by updating our security infrastructure.

Users passwords are stored in a hashed format using secure algorithms, ensuring that even in the event of a data breach, passwords remain protected.`;

export default Page;

export const metadata: Metadata = {
  title: "Terms and Conditions - parallane",
  description:
    "Read parallane's terms and conditions for using our services and learn about our commitment to user privacy.",
};
