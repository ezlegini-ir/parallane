import React from "react";
import { Course, Enrollment, Payment } from "@parallane/database";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Button,
  render,
} from "@react-email/components";

interface OtpEmailProps {
  otp: string;
}

const containerStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  textAlign: "center" as "left" | "center" | "right",
};
const buttonStyles = {
  backgroundColor: "#526eff",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "5px",
  textDecoration: "none",
  textAlign: "center" as "left" | "center" | "right",
  fontSize: "16px",
};

const linkStyles = {
  fontSize: "14px",
  display: "block",
  marginTop: "10px",
  textAlign: "center" as "left" | "center" | "right",
  color: "#526eff",
  textDecoration: "none",
};

const bodyStyles = {
  fontFamily: "Tahoma, sans-serif",
  backgroundColor: "#f9f9f9",
  padding: "20px",
};

const Header = () => {
  return (
    <Container
      style={{
        background: "linear-gradient(to right, #818cf8, #4f46e5)",
        padding: "20px",
        paddingTop: "27px",
        paddingBottom: "27px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <Img
        src="https://dl.parallane.com/public/parallane-logo.png"
        alt="parallane"
        width="135"
        height="auto"
        style={{ display: "inline-block" }}
      />
    </Container>
  );
};

//! ----------------------------------------------------------

const OtpEmail = ({ otp }: OtpEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Your Verification Code for parallane</Preview>
      <Body style={bodyStyles}>
        <Header />

        <Container style={containerStyles}>
          <Text style={{ fontSize: "18px", color: "#333", direction: "ltr" }}>
            Hello! Thank you for registering with parallane.
          </Text>

          <Text style={{ fontSize: "16px", color: "#333", direction: "ltr" }}>
            Here is your verification code:
          </Text>
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              direction: "ltr",
              unicodeBidi: "plaintext",
              color: "#526eff",
              margin: "20px 0",
            }}
          >
            {otp}
          </Text>

          {/* <Button href={"https://parallane.com/login"} style={buttonStyles}>
            Access Your Account
          </Button> */}

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text style={{ color: "#6b7280", direction: "ltr" }}>
            This verification code will expire shortly for security purposes.
          </Text>

          <Text style={{ fontSize: "12px", color: "#888", direction: "ltr" }}>
            Questions? Contact our support team at parallane.com@gmail.com
          </Text>

          <Link href={process.env.NEXT_PUBLIC_BASE_URL} style={linkStyles}>
            Visit parallane
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export const renderOtpEmail = (otp: string) =>
  render(<OtpEmail otp={otp} />, { pretty: true });

//! ----------------------------------------------------------

const ResetPasswordEmail = ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  return (
    <Html>
      <Head />
      {/* <Preview>Password Reset Instructions for Your Account</Preview> */}
      <Body style={bodyStyles}>
        <Header />

        <Container style={containerStyles}>
          <Text style={{ fontSize: "18px", color: "#333", direction: "ltr" }}>
            Dear User, You have requested to reset your password.
          </Text>

          <Button
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/login/reset-password?token=${token}&email=${email}`}
            style={buttonStyles}
          >
            Set New Password
          </Button>

          <Text
            style={{ color: "#6b7280", direction: "ltr", marginTop: "20px" }}
          >
            This link will expire in 24 hours for security purposes.
          </Text>

          <Text style={{ color: "#6b7280", direction: "ltr" }}>
            If you didn't request this password reset, please disregard this
            message.
          </Text>

          <Hr style={{ margin: "20px 0" }} />

          <Text style={{ fontSize: "14px", color: "#666", direction: "ltr" }}>
            Need assistance? Contact our support team at{" "}
            <Link
              href="mailto:support@parallane.com"
              style={{ color: "#526eff" }}
            >
              support@parallane.com
            </Link>
          </Text>

          <Link href={process.env.NEXT_PUBLIC_BASE_URL} style={linkStyles}>
            Visit parallane
          </Link>

          {/* 

          

           */}
        </Container>
      </Body>
    </Html>
  );
};

export const renderResetPasswordEmail = (token: string, email: string) =>
  render(<ResetPasswordEmail token={token} email={email} />, { pretty: true });

//! ----------------------------------------------------------

const FinishCourseEmail = ({
  fullName,
  courseTitle,
}: {
  fullName: string;
  courseTitle: string;
}) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>🎉 Congratulations dear {fullName}!</Preview>
      <Body style={bodyStyles}>
        <Header />

        <Container style={containerStyles}>
          <Text style={{ fontSize: "18px", color: "#333" }}>
            Dear {fullName}, 🎉 Congratulations!
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text style={{ fontSize: "18px", color: "#333" }}>
            🔹 You have successfully completed <strong>"{courseTitle}"</strong>{" "}
            Course. This is a big achievement!
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text style={{ fontSize: "18px", color: "#333" }}>
            Your valuable feedback will help us improve the quality of our
            courses.
          </Text>

          <Button href="https://parallane.com/panel/courses" style={buttonStyles}>
            Rate & Download Certificate
          </Button>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Link href={process.env.NEXT_PUBLIC_BASE_URL} style={linkStyles}>
            parallane.com
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export const renderFinishCourseEmail = (
  courseTitle: string,
  fullName: string
) =>
  render(<FinishCourseEmail courseTitle={courseTitle} fullName={fullName} />, {
    pretty: true,
  });

//! ----------------------------------------------------------

export interface PaymentType extends Payment {
  enrollment: (Enrollment & { course: Course })[];
}

const SuccessPaymentEmail = (data: {
  fullName: string;
  payment: PaymentType;
}) => {
  const { fullName, payment } = data;

  return (
    <Html lang="en">
      <Head />
      <Preview>🔹 Your registration in parallane course was successful!</Preview>
      <Body style={bodyStyles}>
        <Header />

        <Container style={containerStyles}>
          <Text style={{ fontSize: "18px", color: "#333" }}>
            Dear {fullName},
          </Text>

          <Text style={{ fontSize: "18px", color: "#333" }}>
            Thank you for trusting parallane 🌟
            <br />
            Your payment of <strong>${payment.total}</strong> was successful,
            and your registration in the following course has been completed:
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          {payment.enrollment.map(({ course }, index) => (
            <Text
              key={index}
              style={{
                fontSize: "18px",
                color: "#333",
              }}
            >
              🎓 {course.title}
            </Text>
          ))}

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Button href="https://parallane.com/panel/courses" style={buttonStyles}>
            Go to Panel & View Courses
          </Button>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text
            style={{
              fontSize: "14px",
              color: "#888",
              textAlign: "center",
            }}
          >
            Whenever you need support, feel free to reach us via the website or
            your user panel.
          </Text>

          <Link href={process.env.NEXT_PUBLIC_BASE_URL} style={linkStyles}>
            parallane.com
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export const renderSuccessPaymentEmail = (
  fullName: string,
  payment: PaymentType
) =>
  render(<SuccessPaymentEmail payment={payment} fullName={fullName} />, {
    pretty: true,
  });

//! ----------------------------------------------------------

const SuccessPaymentEmailToAdmin = (data: {
  fullName: string;
  payment: PaymentType;
}) => {
  const { fullName, payment } = data;

  return (
    <Html lang="en">
      <Head />
      <Preview>🔹 New Enrollment</Preview>
      <Body style={bodyStyles}>
        <Header />

        <Container style={containerStyles}>
          <Text style={{ fontSize: "18px", color: "#333" }}>
            User: {fullName}
          </Text>

          <Text style={{ fontSize: "18px", color: "#333" }}>
            A payment of <strong>${payment.total}</strong> was successfully
            completed, and registration in the following courses has been
            finalized:
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          {payment.enrollment.map(({ course }, index) => (
            <Text
              key={index}
              style={{
                fontSize: "18px",
                color: "#333",
              }}
            >
              🎓 {course.title}
            </Text>
          ))}

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Link href={process.env.NEXT_PUBLIC_BASE_URL} style={linkStyles}>
            parallane.com
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export const renderSuccessPaymentEmailToAdmin = (
  fullName: string,
  payment: PaymentType
) =>
  render(<SuccessPaymentEmailToAdmin payment={payment} fullName={fullName} />, {
    pretty: true,
  });

//! ----------------------------------------------------------
