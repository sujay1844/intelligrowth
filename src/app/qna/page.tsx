'use client'
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Msg } from "@/components/ui/message";
import { useState, useEffect } from "react";

type MSG = {
    text: string,
    type: "user" | "bot",
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
export default function Home() {
    const items = getItems()
    const [currentDocument, setCurrentDocument] = useState("")
    const [pageStart, setPageStart] = useState(1)
    const [pageEnd, setPageEnd] = useState(10)
    
    const [messages, setMessages] = useState<MSG[]>([])

    async function handleSubmit(e: any) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const message = formData.get("message") as string
        const msg: MSG = {
            text: message,
            type: "user",
        }
        setMessages(prevMessages => [...prevMessages, msg])

        e.target.reset()

        const response = await getResponse(message)
        const botMsg: MSG = {
            text: response,
            type: "bot",
        }
        setMessages(prevMessages => [...prevMessages, botMsg])
    }

    async function getResponse(message: string) {
        const request = {
            messages: messages,
            doc: currentDocument,
            pageStart: pageStart,
            pageEnd: pageEnd,
        }
        console.log("Sending server", request)
        return "Hello"
    }

    useEffect(() => {
        console.log(currentDocument)
    }, [currentDocument])

    return (
        <div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col justify-center align-content">
                    <h1 className="text-5xl text-white p-4">QnA Bot</h1>
                    <h1 className="text-xl text-white p-4">A bot that answers all your questions</h1>
                </div>
            </div>
            <div className="m-4 flex flex-row gap-3 justify-center">
                <Combobox items={items} value={currentDocument} setValue={setCurrentDocument} />
                <Button className="text-white bg-green-700 bg-opacity-0 text-xl">Page number:&nbsp;</Button>
                <Input className="text-white border-none bg-green-700 placeholder:text-slate-300 rounded-2xl w-12" type="text" name="pageStart" onChange={(e) => setPageStart(parseInt(e.target.value))}/>
                <Button className="text-white bg-green-700 bg-opacity-0 text-xl">to</Button>
                <Input className="text-white border-none bg-green-700 placeholder:text-slate-300 rounded-2xl w-12" type="text" name="pageEnd" onChange={(e) => setPageEnd(parseInt(e.target.value))}/>
            </div>
            {messages.map((msg, index) => {
                return <Msg key={index} text={msg.text} type={msg.type} />
            })}
            <form className="flex w-full items-center max-w-[90%] m-auto gap-4" onSubmit={handleSubmit}>
                <Input className="text-white border-none bg-green-700 placeholder:text-slate-300 rounded-2xl" name="message" type="text" placeholder="Enter message here..." />
                <Button className="text-white bg-green-700 hover:bg-green-400 hover:text-black p-4 rounded-2xl" type="submit">Send</Button>
            </form>
        </div>
    )
}