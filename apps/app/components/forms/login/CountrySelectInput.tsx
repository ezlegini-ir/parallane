"use client";

import { cn } from "@/lib/utils";
import { Button } from "@parallane/ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@parallane/ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@parallane/ui/components/ui/popover";
import { countries } from "countries-list";
import { Check, ChevronsUpDown } from "lucide-react";

const formattedCountries = Object.keys(countries).map((key) => ({
  label: countries[key as keyof typeof countries].name,
  value: key,
  flag: `/flags/${key.toLowerCase()}.svg`,
}));

interface CountrySelectInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function CountrySelectInput({
  value,
  onChange,
}: CountrySelectInputProps) {
  const selectedCountry = formattedCountries.find((c) => c.value === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", !value && "text-muted-foreground")}
        >
          {value ? (
            <div className="flex gap-3 items-center">
              <img src={selectedCountry?.flag} className="w-5 h-5" />
              {selectedCountry?.label}
            </div>
          ) : (
            "Select country"
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {formattedCountries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.label}
                  onSelect={() => onChange(country.value)}
                >
                  <img
                    src={country.flag}
                    alt={`${country.label}`}
                    className="w-5 h-5 mr-2"
                  />
                  {country.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      country.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
