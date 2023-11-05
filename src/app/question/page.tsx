'use client'

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useEffectAsync } from "@/lib/hooks"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const sampleAPIResponse = {
    "feedback": "",
    "missing_keywords": [],
    "references": ""
}

export default function Page() {
    const searchParams = useSearchParams()
    const questionNumber = searchParams.get("n")

    const [question, setQuestion] = useState("")
    const [expected, setExpected] = useState("")
    const [response, setResponse] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [apiResponse, setAPIResponse] = useState(sampleAPIResponse)


    const getQuestion = async () => {
        fetch(`http://localhost:8000/q?n=${questionNumber - 1}`, {
            method: 'POST',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setQuestion(data.question)
            setExpected(data.answer)
        }).catch(err => console.log(err))
        return question
    }

    const submit = async () => {
        const query = {
            question: question,
            response: response,
            expected: expected,
        }
        alert(JSON.stringify(query, null, 4))
        fetch('http://localhost:8000/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            setAPIResponse(data)
        })

        setSubmitted(true)
        setAPIResponse(sampleAPIResponse)
    }

    useEffectAsync(async () => {
        setQuestion(await getQuestion())
    }, [])

    return (<div className="m-auto text-center flex flex-col gap-6">
        <h1 className="text-4xl">Question {questionNumber}</h1>
        <h2 className="text-2xl">{question}</h2>
        <Textarea className="bg-stone-900" value={response} onChange={(e) => setResponse(e.target.value)}/>

        <Button className="w-48 m-auto bg-gradient-to-r from-orange-400 to-green-400 text-black" onClick={submit}>Submit</Button>
        
        {submitted && (<div className="flex flex-col gap-4 text-left">
            <div className="flex flex-row gap-12">
                <div className="flex flex-col gap-8">
                    <div>
                        <h2 className="text-2xl">Feedback</h2>
                        <p>{apiResponse.feedback}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl">Expected Answer</h2>
                        <p>{expected}</p>
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
                <p>{apiResponse.references}</p>
            </div>
            </div>)}
    </div>)
}