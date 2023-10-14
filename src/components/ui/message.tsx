'use client'

type MessageProps = {
    text: string,
    type: "user" | "bot",
}

const typedisplay = {
    "user": "User",
    "bot": "Bot",
}

export function Msg({ type, text }: MessageProps) {
    return (
        <div className={`
        p-4 rounded-3xl m-4 text-white transition duration-200 ${type === "user" ? "ml-[15%] bg-green-600" : "mr-[15%] bg-stone-700"}
        `}>
            <p className="break-normal"><b>{type === "bot" ? "Bot: ": ""}</b> {text}</p>
        </div>
    )
    
}