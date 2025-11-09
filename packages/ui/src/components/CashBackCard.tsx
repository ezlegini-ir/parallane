import { Badge } from "@parallane/ui/components/ui/badge";
import { Banknote } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@parallane/ui/components/ui/tooltip";
import { cashBackCalculator, formatPrice } from "@parallane/utils";

const CashBackCard = ({ price }: { price: number }) => {
  const cashBackAmount = cashBackCalculator(price);

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <Badge
            variant={"green"}
            className="w-full font-medium text-sm py-2 flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Banknote size={22} />
              Cashback to wallet:
            </span>
            <span>{formatPrice(cashBackAmount)}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="bg-muted text-foreground">
          <p>For every €99 paid = €5 cashback to your wallet</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CashBackCard;
