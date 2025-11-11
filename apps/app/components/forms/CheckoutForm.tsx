"use client";

import { CheckoutFormDataType, createPayment } from "@/actions/payment";
import { getCouponByCode } from "@/data/coupon";
import { getSessionUser } from "@/data/user";
import { checkoutFormSchema, CheckoutFormType } from "@/lib/validationSchema";
import { paymentsLogos, placeHolder } from "@/public";
import {
  Coupon,
  CouponType,
  Course,
  Discount,
  Image as ImageType,
  User,
  Wallet,
} from "@parallane/database";
import Avatar from "@parallane/ui/components/Avatar";
import CardBox from "@parallane/ui/components/CardBox";
import CashBackCard from "@parallane/ui/components/CashBackCard";
import Loader from "@parallane/ui/components/Loader";
import { Badge } from "@parallane/ui/components/ui/badge";
import { Button } from "@parallane/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@parallane/ui/components/ui/form";
import { Input } from "@parallane/ui/components/ui/input";
import { Separator } from "@parallane/ui/components/ui/separator";
import { Switch } from "@parallane/ui/components/ui/switch";
import { Textarea } from "@parallane/ui/components/ui/textarea";
import { formatPrice, truncateName, useLoading } from "@parallane/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { toast } from "sonner";
import { CountrySelectInput } from "./login/CountrySelectInput";

export interface CourseType extends Course {
  discount: Discount | null;
  image: ImageType | null;
  tutor: {
    image: ImageType | null;
    name: string | null;
  } | null;
}

interface Props {
  course: CourseType;
  wallet: Wallet | null;
  user: User;
}

const CheckoutForm = ({ course, wallet, user }: Props) => {
  // HOOKS ---------------------------
  const [initialCartTotal] = useState(course.price);
  const [userCountry, setUserCountry] = useState(null);
  const [cartTotal, setCartTotal] = useState(course.price);
  const [usedWalletAmount, setUsedWalletAmount] = useState(0);
  const [useWallet, setUseWallet] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<Coupon | undefined>(undefined);
  const [couponAmount, setCouponAmount] = useState(0);
  const { loading: applyDiscountLoading, setLoading: setApplyDiscountLoading } =
    useLoading();
  const { loading, setLoading } = useLoading();

  // CONSTS ---------------------------
  const walletBalance = wallet?.balance || 0;
  const [firstName, ...rest] = user.name?.trim().split(/\s+/) || [];
  const lastName = rest.join(" ") || "";
  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      discountCode: "",
      firstName: firstName || "",
      lastName: lastName || "",
      city: "",
      country: user.country || "",
      phoneNumber: user.phoneNumber || "",
      postalCode: "",
      address: "",
    },
    mode: "onSubmit",
  });
  const discountAmount = course.discount
    ? course.discount?.type === "FIXED"
      ? course.discount?.amount
      : (course.discount?.amount / 100) * course.basePrice
    : 0;
  const form_DiscountCode = form.watch("discountCode") || "";

  // EFFECTS ---------------------------
  useEffect(() => {
    // enable
    if (useWallet) {
      if (coupon) {
        // Coupon Exists
        const usedWalletAmount = Math.min(
          walletBalance,
          initialCartTotal - couponAmount
        );
        setUsedWalletAmount(usedWalletAmount);
        setCartTotal(initialCartTotal - couponAmount - usedWalletAmount);
      } else {
        // Coupon Not Exists
        const usedWalletAmount = Math.min(initialCartTotal, walletBalance);
        setUsedWalletAmount(usedWalletAmount);
        setCartTotal(initialCartTotal - usedWalletAmount);
      }
    } else {
      setUsedWalletAmount(0);
      setCartTotal((prev) => prev + usedWalletAmount);
    }
    // disable
  }, [useWallet]);

  //! APPLY DISCOUNT  ---------------------------
  const applyDiscount = async () => {
    // REMOVE DISCOUNT CODE if already applied
    if (coupon) {
      setCoupon(undefined);
      setCartTotal((prev) => prev + couponAmount);
      setCouponAmount(0);
      form.reset();

      toast.warning("Discount code removed");
      if (useWallet && usedWalletAmount > 0) {
        const usedWalletAmount = Math.min(initialCartTotal, walletBalance);
        setUsedWalletAmount(usedWalletAmount);
        setCartTotal(initialCartTotal - usedWalletAmount);
      }

      return;
    }

    setApplyDiscountLoading(true);

    // COUPON CHECK ---------------
    const existingCoupon = await getCouponByCode(form_DiscountCode);
    if (!existingCoupon) {
      toast.error("Invalid discount code!");
      setApplyDiscountLoading(false);
      return;
    }

    function applyDiscountAmount(type: CouponType) {
      if (!existingCoupon) return;
      setCoupon(existingCoupon);

      if (type === "FIXED_ON_CART" || type === "FIXED_ON_COURSE") {
        const discountValue = existingCoupon.amount;
        const isNegativePrice = cartTotal - discountValue <= 0;
        const finalDiscount = isNegativePrice
          ? useWallet
            ? initialCartTotal - (wallet?.balance || 0)
            : initialCartTotal
          : discountValue;
        setCouponAmount(finalDiscount);
        setCartTotal((prev) => Math.max(0, prev - discountValue));
      } else {
        const discountValue = initialCartTotal * (existingCoupon.amount / 100);
        setCouponAmount(discountValue);
        setCartTotal((prev) => prev - discountValue);
      }
    }

    // DATE CHECK ---------------
    if (existingCoupon.to) {
      const isExpired = existingCoupon.to < new Date();
      if (isExpired) {
        toast.error("This discount code has expired.");
        setApplyDiscountLoading(false);
        return;
      }
    }
    if (existingCoupon.from) {
      const isNotStarted = existingCoupon.from > new Date();
      if (isNotStarted) {
        toast.error("This discount code is not active yet.");
        setApplyDiscountLoading(false);
        return;
      }
    }

    // LIMIT CHECK ---------------
    if (existingCoupon.limit) {
      const isReachedToLimit = existingCoupon.used === existingCoupon.limit;
      if (isReachedToLimit) {
        toast.error("This discount code has reached its usage limit.");
        setApplyDiscountLoading(false);
        return;
      }
    }

    // COURSE INCLUDE/EXCLUDE CHECK ---------------
    if (
      existingCoupon.courseInclude.length > 0 ||
      existingCoupon.courseExclude.length > 0
    ) {
      // COURSE INCLUDE CHECK
      if (existingCoupon.courseInclude.length > 0) {
        const courseIncludeIds = existingCoupon.courseInclude.map((c) => c.id);
        if (!courseIncludeIds.includes(course.id)) {
          toast.error("This discount code is not valid for this course.");
          setApplyDiscountLoading(false);
          return;
        }
        applyDiscountAmount(existingCoupon.type);
      }

      // COURSE EXCLUDE CHECK
      if (existingCoupon.courseExclude.length > 0) {
        const courseExcludeIds = existingCoupon.courseExclude.map((c) => c.id);
        if (courseExcludeIds.includes(course.id)) {
          toast.error("This discount code is not valid for this course.");
          setApplyDiscountLoading(false);
          return;
        }
        applyDiscountAmount(existingCoupon.type);
      }
    } else {
      applyDiscountAmount(existingCoupon.type);
    }

    setApplyDiscountLoading(false);
    toast.success("Discount code applied successfully.");
  };

  useEffect(() => {
    // Fetch the user's IP and country using ipinfo.io
    const getUserCountry = async () => {
      try {
        const res = await fetch("https://ipinfo.io?token=41a6316c39fa84");
        const data = await res.json();
        const country = data.country;
        setUserCountry(country);
      } catch (error) {
        console.error("Error fetching IP information:", error);
      }
    };

    getUserCountry();
  }, []);

  //! ON SUBMIT  ---------------------------
  const onPayment = async () => {
    const user = await getSessionUser();
    setLoading(true);
    if (!user) return;

    if (userCountry === "US") {
      toast.warning(
        "Payment Gateway for United States IP is not allowed. Please use a VPN."
      );
      setLoading(false);
      return;
    }

    const data: CheckoutFormDataType = {
      amount: cartTotal,
      courseId: course.id,
      user,
      itemsTotal: course.basePrice,
      discountAmount: couponAmount + (course.discount?.amount || 0) || 0,
      discountCode: coupon?.code,
      discountCodeAmount: couponAmount,
      useWallet,
      useWalletAmount: useWallet ? usedWalletAmount : undefined,
      userDate: {
        firstName: form.getValues("firstName"),
        lastName: form.getValues("lastName"),
        country: form.getValues("country"),
        phoneNumber: form.getValues("phoneNumber"),
        postalCode: form.getValues("postalCode"),
        address: form.getValues("address"),
        city: form.getValues("city"),
      },
    };

    const res = await createPayment(data);
    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }
    if (res.success && res.paymentUrl) {
      toast.success(res.success);
      redirect(res.paymentUrl);
    }
    if (res.success && res.redirectUrl) {
      toast.success(res.success);
      redirect(res.redirectUrl);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col md:flex-row gap-5"
        onSubmit={form.handleSubmit(onPayment)}
      >
        <CardBox
          title="Personal Info"
          className="md:w-1/2 lg:w-full"
          containerClassname="p-5"
        >
          <div className="flex gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Phone Number</FormLabel> */}
                <FormControl>
                  <PhoneInput
                    specialLabel="Phone Number"
                    country={form.watch("country")?.toLowerCase()}
                    value={field.value}
                    onChange={(phone) => field.onChange(phone)}
                    containerStyle={{
                      fontSize: "14px",
                    }}
                    inputStyle={{
                      marginTop: "4px",
                      paddingLeft: "20px",
                      width: "100%",
                      height: "40px",
                      backgroundColor: "transparent",
                      color: "white",
                      border: "1px solid rgb(30, 41, 59)",
                      borderRadius: "10px",
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <CountrySelectInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardBox>

        <CardBox
          title="Checkout"
          className="w-full md:w-1/2 lg:3/5"
          containerClassname="p-5"
        >
          <div className="flex items-center gap-2 card">
            <Image
              alt={course.title}
              src={course?.image?.url || placeHolder}
              width={90}
              height={90}
              className="rounded-sm aspect-video object-cover bg-muted"
            />

            <div>
              <p className="font-medium">
                {truncateName({ name: course.title, maxLength: 30 })}
              </p>
              <div className="flex gap-1 items-center">
                <Avatar src={course?.tutor?.image?.url} size={20} />
                <span className="font-normal text-xs text-slate-500">
                  {course?.tutor?.name}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex text-nowrap items-center gap-2 text-sm font-medium">
              <span>Course price</span>
              <div className="w-full">
                <Separator />
              </div>
              <div>{formatPrice(course.basePrice)}</div>
            </div>

            {discountAmount > 0 && (
              <div className="flex text-nowrap items-center gap-2 text-sm text-muted-foreground">
                <span>Course discount</span>
                <div className="w-full">
                  <Separator />
                </div>
                <div>- {formatPrice(discountAmount)}</div>
              </div>
            )}

            {couponAmount > 0 && (
              <div className="flex text-nowrap items-center gap-2 text-sm text-muted-foreground">
                <span>Discount code deduction</span>
                <div className="w-full">
                  <Separator />
                </div>
                <div>-{formatPrice(couponAmount)}</div>
              </div>
            )}

            {usedWalletAmount > 0 && (
              <div className="flex text-nowrap items-center gap-2 text-sm text-muted-foreground">
                <span>Wallet deduction</span>
                <div className="w-full">
                  <Separator />
                </div>
                <div>- {formatPrice(usedWalletAmount)}</div>
              </div>
            )}

            {/* //! PURCHASE BUTTON */}
            <div className="space-y-3">
              <Button
                size={"lg"}
                disabled={loading}
                className="w-full font-medium text-base"
              >
                <Loader loading={loading} />
                {loading ? (
                  "Redirecting..."
                ) : cartTotal > 0 ? (
                  <span className="flex">Pay €{cartTotal}</span>
                ) : (
                  <span className="flex">Complete registration</span>
                )}
              </Button>

              {userCountry === "US" && (
                <Badge variant={"orange"} className="p-3 text-sm">
                  <div className="text-center">
                    <span className="font-normal">
                      Payment Gateway for United States IP is not allowed.
                      Please use a VPN.{" "}
                    </span>
                    <a
                      className="underline text-primary"
                      href="https://xvpn.io/download/vpn-win"
                      target="_blank"
                    >
                      Download X-VPN
                    </a>
                  </div>
                </Badge>
              )}

              <CashBackCard price={cartTotal} />
            </div>
          </div>

          {walletBalance > 0 && initialCartTotal !== 0 && (
            <Badge
              variant={useWallet ? "blue" : "gray"}
              className={`flex justify-between items-center text-sm font-medium py-3 hover:bg-muted
            ${
              cartTotal === 0 &&
              coupon &&
              !usedWalletAmount &&
              "pointer-events-none opacity-50"
            }
            `}
            >
              <div className="flex flex-col gap-1">
                <span>Use wallet</span>
                <span className="text-xs">
                  Balance: {formatPrice(walletBalance)}
                </span>
              </div>

              <Switch
                dir="ltr"
                checked={useWallet}
                onCheckedChange={(checked: boolean) => setUseWallet(checked)}
              />
            </Badge>
          )}

          {initialCartTotal !== 0 && (
            <div className="relative">
              <FormField
                control={form.control}
                name="discountCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus
                        disabled={!!coupon}
                        className="relative pr-20 font-medium tracking-wide"
                        placeholder="Discount code"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                disabled={applyDiscountLoading}
                className="absolute px-4 inset-y-0 h-7 right-1 my-auto rounded-sm"
                type="button"
                size={"sm"}
                variant={"secondary"}
                onClick={applyDiscount}
              >
                <Loader loading={applyDiscountLoading} />
                {coupon ? (
                  <span className="flex gap-1">
                    <X />
                    Remove
                  </span>
                ) : applyDiscountLoading ? (
                  "Checking..."
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
          )}

          <Image
            alt="payments"
            src={paymentsLogos}
            width={250}
            height={35}
            className="saturate-0 hover:saturate-50 transition-all pt-2"
          />
        </CardBox>
      </form>
    </Form>
  );
};

export default CheckoutForm;
