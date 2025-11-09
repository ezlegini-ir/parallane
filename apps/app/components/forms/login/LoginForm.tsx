"use client";

import { User } from "@parallane/database";
import RecaptchaWrapper from "@parallane/ui/components/RecaptchaWrapper";
import { Dispatch, SetStateAction, useState } from "react";
import ResetPasswordInputForm from "./ResetPasswordInputForm";
import InputForm from "./InputForm";
import RegisterForm from "./RegisterForm";

interface Props {
  redirectTo?: string;
  callbackUrl?: string;
  onSuccess?: () => void;
}

export interface LoginFormsProps {
  setLoginStep: Dispatch<SetStateAction<LoginSteps>>;
  loginStep?: LoginSteps;
  setInputFormValue?: Dispatch<React.SetStateAction<string>>;
  inputFormValue?: string;
  setIsNewUser?: Dispatch<React.SetStateAction<boolean>>;
  isNewUser?: boolean;
  redirectTo?: string;
  callbackUrl?: string;
  onSuccess?: () => void;
  setNewUser?: Dispatch<SetStateAction<User | undefined>>;
}

export type LoginSteps = "INPUT" | "FORGOTPASSWORD" | "REGISTER";

const LoginForm = ({ redirectTo, onSuccess, callbackUrl }: Props) => {
  // HOOKS
  const [loginStep, setLoginStep] = useState<LoginSteps>("INPUT");

  return (
    <div className="md:w-[350px] mx-auto">
      <RecaptchaWrapper
        recaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      >
        {loginStep === "INPUT" && (
          <InputForm
            setLoginStep={setLoginStep}
            onSuccess={onSuccess}
            redirectTo={redirectTo}
            callbackUrl={callbackUrl}
          />
        )}

        {loginStep === "FORGOTPASSWORD" && (
          <ResetPasswordInputForm setLoginStep={setLoginStep} />
        )}

        {loginStep === "REGISTER" && (
          <RegisterForm
            setLoginStep={setLoginStep}
            redirectTo={redirectTo}
            onSuccess={onSuccess}
            callbackUrl={callbackUrl}
          />
        )}
      </RecaptchaWrapper>
    </div>
  );
};

export default LoginForm;
