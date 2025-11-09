import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@parallane/ui/components/ui/breadcrumb";
import Link from "next/link";
import { Home } from "lucide-react";

interface Props {
  steps?: { label: string; href: string }[];
  finalStep: string;
}

const BreadCrumb = ({ steps, finalStep }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link className="flex gap-2 items-center" href={"/"}>
              <Home size={16} /> Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {steps &&
          steps.map((step, index) => (
            <div className="flex gap-3" key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={step.href}>{step.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          ))}

        <BreadcrumbItem>
          <BreadcrumbPage>{finalStep}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
