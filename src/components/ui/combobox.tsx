"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxProps = {
  items: { value: string; label: string }[],
  value: string,
  setValue: (value: string) => void,
}

export function Combobox({ items, value, setValue }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="border-none">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-green-700 rounded-2xl text-white border-none hover:bg-stone-500 hover:text-white transition duration-200"
        >
          {value
            ? items.find((item) => item.value == value)?.label
            : "Select document..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-teal-900 border-none">
        <Command className="bg-teal-900">
          <CommandInput className="placeholder:text-white placeholder:opacity-50" placeholder="Search document..." />
          <CommandEmpty>No document found.</CommandEmpty>
          <CommandGroup className="bg-teal-900">
            {items.map((item) => (
              <CommandItem className="bg-teal-900 text-white"
                key={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
