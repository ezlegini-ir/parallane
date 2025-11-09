"use client";

import { User, Wallet } from "@parallane/database";
import { Card } from "@parallane/ui/components/ui/card";
import { useState } from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import ConfirmEmailForm from "./ConfirmEmailForm";

export type UserType = User & { wallet: Wallet | null };

const OnboardingForm = ({ user }: { user: UserType }) => {
  const [stage, setStage] = useState<"CONFIRM_EMAIL" | "PERSONAL_INFO">(
    user?.emailVerified ? "PERSONAL_INFO" : "CONFIRM_EMAIL"
  );

  return (
    <div className="max-w-lg w-full space-y-3">
      <Card className="p-5 transition-all">
        {stage === "PERSONAL_INFO" ? (
          <PersonalInfoForm user={user} />
        ) : (
          <ConfirmEmailForm
            email={user.email}
            userId={user.id}
            onSuccessfulConfirm={() => setStage("PERSONAL_INFO")}
          />
        )}
      </Card>

      <div className="text-muted-foreground w-fit mx-auto">
        {stage === "CONFIRM_EMAIL" ? (
          <div className="flex gap-1">
            <div className="h-1 w-full bg-primary rounded-full" />
            <div className="h-1 w-full bg-muted rounded-full" />
          </div>
        ) : (
          <div className="flex gap-1">
            <div className="h-1 w-full bg-primary rounded-full" />
            <div className="h-1 w-full bg-primary rounded-full" />
          </div>
        )}
        <span className="text-xs pt-1">
          {stage === "CONFIRM_EMAIL" ? "Step 1/2" : "Step 2/2"}
        </span>
      </div>
    </div>
  );
};

export default OnboardingForm;
