"use server";

import { signIn } from "@parallane/auth";

export const GoogleOAuthSignIn = async ({
  callbackUrl,
}: {
  callbackUrl: string | null;
}) => {
  await signIn("google", {
    redirectTo: callbackUrl
      ? `/onboarding?callbackUrl=${callbackUrl}`
      : "/onboarding",
  });
};
