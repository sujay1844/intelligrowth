'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Combobox } from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const subjects = [
  { label: "Fundamental Duties", value: "fundamental duties" },
  { label: "Federalism", value: "federalism" },
]

export default function Page() {
  const [subject, setSubject] = useState("")
  const { push } = useRouter()

  const generateQuestions = () => {
    push('/topics')
  }

  return (<div className="flex flex-col gap-8 m-auto text-center">
    <h1 className="text-7xl"><span className="text-orange-400">Int</span>elli<span className="text-green-400">growth</span></h1>
    <p className="text-3xl">Your personalized learning platform</p>
    <p>Select the subject and topics you want to study</p>
    <div className="flex flex-row gap-8 m-auto">
      <Combobox name="subject" options={subjects} value={subject} setValue={setSubject}/>

      <Button className="m-auto bg-gradient-to-r from-orange-400 to-green-400 text-black" onClick={generateQuestions}>Choose topics &nbsp;<ChevronRight className="h-4 w-4" /></Button>
    </div>
  </div>)
}