import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const authority = searchParams.get("authority");
    const success = searchParams.get("success");

    if (!authority || success === null) {
      return NextResponse.json(
        { success: false, error: "Missing query parameters" },
        { status: 400 }
      );
    }

    const redirectUrl =
      process.env.NODE_ENV === "development"
        ? `${origin}/checkout-result?Authority=${authority}&Status=${success}`
        : `https://parallane.com/checkout-result?Authority=${authority}&Status=${success}`;

    return NextResponse.redirect(redirectUrl, 303);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
