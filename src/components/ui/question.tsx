'use client'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type QProps = {
    question: string,
    doc: string,
    pageStart: number,
    pageEnd: number,
}

export function Question({ question, doc, pageStart, pageEnd }: QProps) {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const request = {
            question: question,
            document: doc,
            pageStart: pageStart,
            pageEnd: pageEnd,
            answer: userAnswer,
        };
        console.log(request);
        const response = {
            score: 0,
            feedback: 'Correct',
        };
        setScore(response.score);
        setFeedback(response.feedback);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='px-4'>
                    <Button className='text-white bg-teal-950 hover:bg-teal-950'>Question:</Button>
                    <Input className='text-white border-none bg-green-700 placeholder:text-slate-300 rounded-2xl w-[70%]' type="text" value={question} readOnly />
                </div>
                <br />
                <div className='px-4'>
                    <Button className='text-white bg-teal-950 hover:bg-teal-950'>Answer:</Button>
                    <Input className='text-white border-none bg-green-700 placeholder:text-slate-300 rounded-2xl w-[70%]' type="text" value={userAnswer} onChange={(event) => setUserAnswer(event.target.value)} />
                </div>
                <br />
                <Button className='text-white bg-green-700 hover:bg-green-400 hover:text-black p-4 rounded-2xl m-4' type="submit">Submit</Button>
            </form>
            <div>
                <h1 className='text-5xl text-white p-4 bg-green-900 rounded-3xl w-[30%] ml-4'><b>Score: </b>{score} / 10</h1>
                <p className='text-white p-4 border-teal-300'><b>Feedback: </b>{feedback}</p>
            </div>
        </div>
    );
}