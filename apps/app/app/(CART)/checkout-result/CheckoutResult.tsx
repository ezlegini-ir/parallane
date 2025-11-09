"use client";

import { verifyPayment } from "@/actions/payment";
import { Button } from "@parallane/ui/components/ui/button";
import { Separator } from "@parallane/ui/components/ui/separator";
import useError from "@/hooks/useError";
import useSuccess from "@/hooks/useSuccess";
import { CircleCheckBig, CircleX, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Status = "SUCCESS" | "FAIL" | "PENDING";

interface Props {
  authority: string;
  status: string;
}

const CheckoutResult = ({ authority, status }: Props) => {
  const [result, setResult] = useState<Status>("PENDING");
  const [refId, setRefId] = useState<number>();
  const { error, setError } = useError();
  const { success, setSuccess } = useSuccess();

  const pending = result === "PENDING";
  const successStatus = result === "SUCCESS";
  const fail = result === "FAIL";

  useEffect(() => {
    const verifyCheckout = async () => {
      const res = await verifyPayment(authority, status);

      if (res.error) {
        setResult("FAIL");
        setError(res.error);
        return;
      }

      if (res.success && res.refId) {
        setResult("SUCCESS");
        setSuccess(res.success);
        setRefId(+res.refId);
        return;
      }
    };

    verifyCheckout();
  }, []);

  return (
    <div className="card max-w-[350px] mx-auto flex flex-col justify-center items-center space-y-3 w-full pt-5">
      {pending ? (
        <Loader2 className="animate-spin text-primary" size={65} />
      ) : successStatus ? (
        <CircleCheckBig className="text-green-500" size={65} />
      ) : (
        <CircleX className="text-destructive" size={65} />
      )}

      <div className="text-center">
        <div className="font-medium flex flex-col gap-1">
          {error ? error : success ? success : "Processing..."}
          {error && (
            <div className="text-gray-500 text-sm flex flex-col gap-2">
              <span className="text-foreground">Please try again</span>
              <Separator />
              If the amount was deducted from your account, contact us at panel{" "}
              {">"} support.
            </div>
          )}
        </div>
        {pending && (
          <p className="text-sm text-muted">Please don’t leave this page!</p>
        )}
      </div>

      {successStatus && (
        <div className="flex gap-8 text-xs text-muted">
          <p>Payment ID: {refId}</p>
        </div>
      )}

      <div className="w-full space-y-3">
        {!fail && (
          <Link href={"/panel/courses"}>
            <Button disabled={pending} className="w-full">
              My Courses
            </Button>
          </Link>
        )}

        <div>
          <Link href={"/panel/payments"}>
            <Button variant={"secondary"} disabled={pending} className="w-full">
              Payment History
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutResult;
