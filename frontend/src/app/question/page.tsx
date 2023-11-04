'use client'

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useEffectAsync } from "@/lib/hooks"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const sampleAPIResponse = {
    "expected": "New Delhi",
    "feedback": "New Delhi is the capital of India.",
    "missing_keywords": ['New', 'Delhi'],
    "references": {
        "text": [
            { 'page_no': 45 },
        ],
        "yt" : [
            { 'link': 'google.com', 'timestamp': 23 },
        ]
    }
}

export default function Page() {
    const searchParams = useSearchParams()
    const questionNumber = searchParams.get("n")

    const [question, setQuestion] = useState("")
    const [response, setResponse] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [apiResponse, setAPIResponse] = useState(sampleAPIResponse)


    const getQuestion = async () => {
        // const response = await fetch("/api/question")
        // const json = await response.json()
        // const question = json.question
        const question = "What is the capital of India?"
        return question
    }

    const submit = async () => {
        const query = {
            question: question,
            response: response,
        }
        // send query to API

        setSubmitted(true)
        setAPIResponse(sampleAPIResponse)
    }

    useEffectAsync(async () => {
        setQuestion(await getQuestion())
    }, [])

    return (<div className="m-auto text-center flex flex-col gap-6">
        <h1 className="text-4xl">Question {questionNumber}</h1>
        <h2 className="text-2xl">{question}</h2>
        <Textarea value={response} onChange={(e) => setResponse(e.target.value)}/>

        <Button className="w-48 m-auto" onClick={submit}>Submit</Button>
        
        {submitted && (<div className="flex flex-col gap-4 text-left">
            <div className="flex flex-row gap-12">
                <div className="flex flex-col gap-8">
                    <div>
                        <h2 className="text-2xl">Feedback</h2>
                        <p>{apiResponse.feedback}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl">Expected Answer</h2>
                        <p>{apiResponse.expected}</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl">Missing Keywords</h2>
                    <ul>
                        {apiResponse.missing_keywords.map((keyword) => (<li key={keyword}>- {keyword}</li>))}
                    </ul>
                </div>
            </div>
            <div>
                <h2 className="text-2xl">References</h2>
                <h3 className="text-xl font-semibold">Textbook</h3>
                <ul>
                    {apiResponse.references.text.map((ref) => (<li key={ref.page_no}>- Page {ref.page_no}</li>))}
                </ul>
                <h3 className="text-xl font-semibold">YouTube</h3>
                <ul>
                    {apiResponse.references.yt.map((ref) => (<li key={ref.link}><a href={ref.link}>- Time: {ref.timestamp} </a></li>))}
                </ul>
            </div>
            </div>)}
    </div>)
}