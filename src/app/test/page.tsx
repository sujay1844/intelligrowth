'use client'
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Question } from "@/components/ui/question";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type QA = {
    question: string,
    answer: string,
}

function getItems() {
    const items = [
        {
            value: "icse 5th std science",
            label: "ICSE 5th Std Science",
        },
        {
            value: "icse 7th std maths",
            label: "ICSE 7th Std Maths",
        },
        {
            value: "icse 2nd std english",
            label: "ICSE 2nd Std English",
        },
        {
            value: "icse 9th std history",
            label: "ICSE 9th Std History",
        },
    ]
    return items
}

async function getQuestions(currentDocument: string, pageStart: number, pageEnd: number) {
    const questions = [
            "What is the capital of India?",
            "What is the capital of Karnataka?",
            "What is the capital of Tamil Nadu?",
            "What is the capital of Kerala?",
    ]
    return questions
}
export default function Home() {
    const items = getItems()
    const [currentDocument, setCurrentDocument] = useState("")
    const [pageStart, setPageStart] = useState(1)
    const [pageEnd, setPageEnd] = useState(10)
    
    const [questions, setQuestions] = useState<string[]>([])
    const [messages, setMessages] = useState<QA[]>([])

    useEffect(() => {
        console.log(currentDocument)
    }, [currentDocument])

    return (
        <div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col justify-center align-content">
                    <h1 className="text-5xl text-white p-4">Test Bot</h1>
                    <h1 className="text-xl text-white p-4">A bot that gives you questions are evaluates your answers</h1>
                </div>
            </div>
            <div className="m-4 flex flex-row gap-3 justify-center">
                <Combobox items={items} value={currentDocument} setValue={setCurrentDocument} />
                <Button className="text-white bg-green-700 bg-opacity-0 text-xl">Page number:&nbsp;</Button>
                <Input className="text-white border-none bg-green-700 placeholder:text-slate-300 rounded-2xl w-12" type="text" name="pageStart" onChange={(e) => setPageStart(parseInt(e.target.value))}/>
                <Button className="text-white bg-green-700 bg-opacity-0 text-xl">to</Button>
                <Input className="text-white border-none bg-green-700 placeholder:text-slate-300 rounded-2xl w-12" type="text" name="pageEnd" onChange={(e) => setPageEnd(parseInt(e.target.value))}/>
                <Button className='text-white bg-green-700 hover:bg-green-400 hover:text-black p-4 rounded-2xl m-4' onClick={async () => setQuestions(await getQuestions(currentDocument, pageStart, pageEnd))}>Get questions</Button>
            </div>
            <Accordion type="single" collapsible className="w-full">
            {questions.map((question, idx) => (
                <AccordionItem key={idx} value={"question"+idx}>
                    <AccordionTrigger className="text-white p-4 border-teal-300">Question {idx}</AccordionTrigger>
                    <AccordionContent>
                        <Question question={question} doc={currentDocument} pageStart={pageStart} pageEnd={pageEnd}/>
                    </AccordionContent>
                </AccordionItem>
            ))}

            </Accordion>

        </div>
    )
}