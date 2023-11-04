'use client'

import { useState } from "react"
import { redirect } from "next/navigation"

import { Combobox } from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const subjects = [
  { label: "History", value: "history" },
  { label: "Geography", value: "geography" },
  { label: "Civics", value: "civics" },
]

const chapters = [
  { label: "Chapter 1", value: "chapter 1"},
  { label: "Chapter 2", value: "chapter 2"},
  { label: "Chapter 3", value: "chapter 3"},
]

export default function Page() {
  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")

  const generateQuestions = () => {
    const output = {
      subject: subject,
      chapter: chapter,
    }
    alert(JSON.stringify(output, null, 4))
    // Send to backend here

    // redirect to question page
    redirect("/question?n=1")
  }

  return (<div className="flex flex-col gap-8 m-auto text-center">
    <h1 className="text-7xl"><span className="text-orange-400">Int</span>elli<span className="text-green-400">growth</span></h1>
    <p className="text-3xl">Your personalized learning platform</p>
    <p>Select the subject and chapter you want to study and click on generate questions</p>
    <div className="flex flex-row gap-8">
      <Combobox name="subject" options={subjects} value={subject} setValue={setSubject}/>
      <Combobox name="chapter" options={chapters} value={chapter} setValue={setChapter}/>

      <Button className="bg-gradient-to-r from-orange-400 to-green-400 text-black" onClick={generateQuestions}>Generate questions &nbsp;<ChevronRight className="h-4 w-4" /></Button>
    </div>
  </div>)
}