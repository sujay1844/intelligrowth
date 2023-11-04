'use client'
import { useState } from "react";

import CheckboxReactHookFormMultiple from "@/components/ui/CheckboxMultiple";

export default function Page() {
    const [topics, setTopics] = useState([]);
    return (
        <div className="m-auto text-center flex flex-col gap-6">
            <CheckboxReactHookFormMultiple setTopics={setTopics} />
        </div>
    );
}