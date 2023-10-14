'use client';
import {useState} from 'react';
import * as React from "react"
import { Combobox } from "@/components/ui/combobox";
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

export default function Home() {
  const [summary, setSummary] = useState("")
  const [page_no,setPageNo] = useState([])
  const [currentDocument, setCurrentDocument] = useState("")
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

  async function getSummary() {
    const request = {
        doc: currentDocument,
        pageStart: page_no[0],
        pageEnd: page_no[1],
    }
    console.log("Sending server", request)
    return "Hello"
  }

  return (
    <div className="flex flex-row min-h-screen justify-left">
        <Card className="bg-stone-700">
        <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle className="text-white p-1">Summarize Documents</CardTitle>
            <CardDescription className="text-white p-4">Ask AI to summarize your Documents</CardDescription>
        </CardHeader>
        <CardContent>
      <div className="flex flex-col items-center gap-3 justify-center ">
      <Combobox items={options} value={currentDocument} setValue={setCurrentDocument} />
        <Button className="text-white bg-green-700 bg-opacity-0 text-xl">Page number:&nbsp;</Button>
        <div className="flex">
        <Input className="p-4  text-white border-none bg-green-700 hover:bg-green-500 placeholder:text-slate-300 rounded-2xl" min="0" max="100" value={page_no[0]} onChange = {e=>e.target.value} type="number" name="number" />
        <Button className="text-white bg-green-700 bg-opacity-0 text-xl">to</Button>
        <Input className="p-4  text-white border-none bg-green-700 hover:bg-green-500 placeholder:text-slate-300 rounded-2xl" min="0" max="100" value={page_no[1]} onChange = {e=>e.target.value} type="number" name="number" />
        </div>
        <Button onClick={getSummary} className="text-white bg-green-700 hover:bg-green-400 hover:text-black p-4 rounded-2xl">Summarize Document</Button>
      </div>
       </CardContent>
       </Card>
      <div className="flex p-4 w-3/4  text-white">
        { summary ? <ScrollArea>
        <Label className="flex justify-center items-center text-2xl">Summary</Label>
        <div>
        {summary}
        </div>
        </ScrollArea> : null }
      </div> 
    </div> 
  )
}
