'use client';
import {useState} from 'react';
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios';

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Option[];
}

export default function Home() {
  const [summary, setSummary] = useState("")
  const [page_no,setPageNo] = useState([])
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const options = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]

  const Combobox=({ options }: ComboboxProps) => {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between rounded-full"
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : "Select the Document"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search option..." />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
  const get_summary = () =>{
    {
      const api_url = '';
      axios({
        url: api_url, 
        method: 'GET',
        responseType: 'blob', 
      })
        .then((response) => {
            setSummary(response.data);
        })
        .catch((error) => {
          console.error('Error while etting the Summary ', error);
        });
    };
  }
  return (
    <div className="flex flex-row min-h-screen justify-left bg-slate-200">
        <Card>
        <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle >Summarize Documents</CardTitle>
            <CardDescription>Ask AI to summarize your Documents</CardDescription>
        </CardHeader>
        <CardContent>
      <div className="flex flex-col items-center gap-3 justify-center">
        <Combobox options={options}/>
        <Label className="p-1">Page No</Label>
        <div className="flex">
        <Input className="p-4 rounded-full" min="0" max="100" value={page_no[0]} onChange = {e=>e.target.value} type="number" name="number" />
        <Label className="p-4">to</Label>
        <Input className="p-4 rounded-full" min="0" max="100" value={page_no[1]} onChange = {e=>e.target.value} type="number" name="number" />
        </div>
        <Button onClick={get_summary}>Summarize Document</Button>
      </div>
       </CardContent>
       </Card>
      <div className="flex rounded-md border p-4 w-3/4 ">
        { summary ? <ScrollArea>
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left by
        Jokester were so funny that they couldn't help but laugh. And once they
        started laughing, they couldn't stop.
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left by
        Jokester were so funny that they couldn't help but laugh. And once they
        started laughing, they couldn't stop.
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left by
        Jokester were so funny that they couldn't help but laugh. And once they
        started laughing, they couldn't stop.
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left by
        Jokester were so funny that they couldn't help but laugh. And once they
        started laughing, they couldn't stop.
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left by
        Jokester were so funny that they couldn't help but laugh. And once they
        started laughing, they couldn't stop.
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left by
        Jokester were so funny that they couldn't help but laugh. And once they
        started laughing, they couldn't stop.
        </ScrollArea> : null }
      </div> 
    </div> 
  )
}
