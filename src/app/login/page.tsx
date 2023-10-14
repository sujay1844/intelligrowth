import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function Home() {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center bg-slate-200">
      <div className="flex flex-col w-full max-w-sm items-center gap-3 justify-center">
        <h1 className="text-5xl">Intelligrowth</h1>
        <p>Your personal study companion</p>
        <Input type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <Button>Login</Button>
      </div>
    </div>
  )
}
