"use server";

import { database } from "@parallane/database";
import { unstable_cache } from "next/cache";

export const getFloatingBanner = unstable_cache(
  async () => {
    return await database.floatingBanner.findFirst({
      where: { active: true },
      include: {
        image: true,
        coupon: true,
      },
    });
  },
  ["floating-banner"],
  { revalidate: 300 }
);
