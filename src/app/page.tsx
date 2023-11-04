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

const chapters = [
  { label: "Enforcing Fundamental Duties", value: "enforcing fundamental duties" },
  { label: "Hijab & Freedom of Religio", value: "hijab & freedom of religio" },
  { label: "Public Orde", value: "public orde" },
  { label: "Right to Protest", value: "right to protest" },
  { label: "Government Aid Not a Fundamental Right: SC", value: "government aid not a fundamental right: sc" },
  { label: "Fundamental Rights to Reside and to Move About Freely .", value: "fundamental rights to reside and to move about freely ." },
  { label: "SC Judgement on Preventive Detention", value: "sc judgement on preventive detention" },
  { label: "Uniform Civil Code", value: "uniform civil code" },
  { label: "Minority Educational Institutions and Right to Education", value: "minority educational institutions and right to education" },
  { label: "Right to Privacy", value: "right to privacy" },
  { label: "Right to Forgotten", value: "right to forgotten" },
  { label: "Right of Reputation vs Right to Dignity", value: "right of reputation vs right to dignity" },
  { label: "Free Legal Aid", value: "free legal aid" },
  { label: "Lok Adalat", value: "lok adalat" },
  { label: "Draft Anti-Conversion Bill: Haryana", value: "draft anti-conversion bill: haryana" },
  { label: "Role and Power of Governor", value: "role and power of governor" },
  { label: "Governor’s Role in Universities", value: "governor’s role in universities" },
  { label: "Governor’s Power to decide on Bills: Veto Power", value: "governor’s power to decide on bills: veto power" },
  { label: "Chief Minister", value: "chief minister" },
  { label: "Union' or 'Central' Government", value: "union' or 'central' government" },
  { label: "Interim Report of J&K Delimitation Commission", value: "interim report of j&k delimitation commission" },
  { label: "Assam-Meghalaya Border Dispute", value: "assam-meghalaya border dispute" },
  { label: "Krishna Water Dispute", value: "krishna water dispute" },
  { label: "Statehood Demand by Puducherry", value: "statehood demand by puducherry" },
  { label: "Belagavi Border Dispute", value: "belagavi border dispute" },
  { label: "Demand for Including Ladakh under Sixth Schedule", value: "demand for including ladakh under sixth schedule" },
  { label: "Special Category Status", value: "special category status" },
  { label: "E-ILP Platform: Manipur", value: "e-ilp platform: manipur" },
  { label: "Legislative Council", value: "legislative council" },
  { label: "Government of NCT of Delhi (Amendment) Ac", value: "government of nct of delhi (amendment) ac" },
  { label: "National Panchayati Raj Day", value: "national panchayati raj day" },
]

export default function Page() {
  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")
  const { push } = useRouter()

  const generateQuestions = () => {
    const output = {
      subject: subject,
      chapter: chapter,
    }
    alert(JSON.stringify(output, null, 4))
    // Send to backend here

    // redirect to question page
    push("/question?n=1")
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