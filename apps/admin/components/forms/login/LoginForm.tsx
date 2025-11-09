"use client";

import { useIdentifier } from "@parallane/utils";
import { useLoginStep } from "@parallane/utils";
import InputForm from "./InputForm";
import OtpForm from "./OtpForm";

const LoginForm = () => {
  // HOOKS
  const { loginStep, setLoginStep } = useLoginStep(["INPUT", "OTP"]);
  const { identifier, setIdentifier } = useIdentifier();

  return (
    <>
      {loginStep === "INPUT" && (
        <InputForm setLoginStep={setLoginStep} setIdentifier={setIdentifier} />
      )}

      {loginStep === "OTP" && (
        <OtpForm setLoginStep={setLoginStep} identifier={identifier} />
      )}
    </>
  );
};

export default LoginForm;
