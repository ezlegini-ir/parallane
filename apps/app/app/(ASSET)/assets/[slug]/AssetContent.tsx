"use client";

import { addDownloadCount as downloadAsset } from "@/actions/asset";
import LoginForm from "@/components/forms/login/LoginForm";
import { getSessionUser } from "@/data/user";
import { placeHolder } from "@/public";
import { Asset, Image as ImageType } from "@parallane/database";
import parallaneLogoSquare from "@parallane/ui/components/parallaneLogoSquare";
import Loader from "@parallane/ui/components/Loader";
import { Button } from "@parallane/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@parallane/ui/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@parallane/ui/components/ui/tooltip";
import { useLoading } from "@parallane/utils";
import { formatDate } from "date-fns";
import { Download, Info } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AssetType extends Asset {
  image: ImageType | null;
}

interface Props {
  asset: AssetType;
}

const AssetContent = ({ asset }: Props) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { loading, setLoading } = useLoading();

  const router = useRouter();
  const pathname = usePathname();

  const onDownload = async () => {
    setLoading(true);
    const user = await getSessionUser();
    if (!user) {
      setShowLoginModal(true);
      setLoading(false);
      return;
    }

    const res = await downloadAsset(asset.id);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    if (res.success) {
      toast.success("Donwload starts soon");
      window.location.href = asset.fileUrl;
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="flex justify-between items-center gap-4 flex-wrap w-full">
        <div className="flex gap-3 items-center">
          <parallaneLogoSquare />
          <div>
            <h1 className="text-xl">{asset.title}</h1>
            <span className="text-sm text-muted-foreground">
              {" "}
              parallane Assets
            </span>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>
                <Info className="text-muted-foreground" size={20} />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <ul className="max-w-sm w-[200px] space-y-3 py-2 px-1">
                  <li className="flex justify-between">
                    <span>Format:</span>
                    <span dir="ltr">{asset.format}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Size:</span>
                    <span dir="ltr">{asset.fileSize} mb</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Date Released:</span>
                    <span>{formatDate(asset.createdAt, "yyyy/MM/dd")}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Downloaded:</span>
                    <span>{asset.downloadCount}</span>
                  </li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            className="hidden md:flex"
            disabled={loading}
            onClick={onDownload}
            size={"lg"}
          >
            {loading ? <Loader /> : <Download className="scale-105" />}
            Free Download
          </Button>
        </div>
      </div>

      <Image
        alt={asset.title}
        src={asset?.image?.url || placeHolder}
        width={900}
        height={900}
        className="aspect-square object-cover rounded-2xl w-[550px] h-auto bg-muted "
      />

      <Button
        className="md:hidden w-full "
        disabled={loading}
        onClick={onDownload}
        size={"lg"}
      >
        {loading ? <Loader /> : <Download className="scale-105" />}
        Free Download
      </Button>

      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="p-5 max-w-sm">
          <DialogHeader>
            <DialogTitle className="sr-only">
              You must be logged in to download the asset
            </DialogTitle>
          </DialogHeader>
          <LoginForm
            redirectTo={pathname}
            onSuccess={() => setShowLoginModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssetContent;
