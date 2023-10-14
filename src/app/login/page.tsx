import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center bg-slate-200">
      <div className="flex flex-col w-full max-w-sm items-center gap-3 justify-center">
        <h1 className="text-5xl">Intelligrowth</h1>
        <p>Your personal study companion</p>
        <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Log In</TabsTrigger>
        <TabsTrigger value="password">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
        <div className="flex flex-col w-full max-w-sm items-center gap-3 justify-center pt-3">
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input type="email" placeholder="Email" name="email" />
            </div>
            <div className="space-y-1">
              <Input type="password" placeholder="Password" name="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Login</Button>
          </CardFooter>
        </div>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
        <div className="flex flex-col w-full max-w-sm items-center gap-3 justify-center pt-3">
        <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input type="email" placeholder="Email" name="email" />
            </div>
            <div className="space-y-1">
              <Input type="password" placeholder="Password" name="password" />
            </div>
            <div className="space-y-1">
              <Input type="password" placeholder="Password" name="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Register</Button>
          </CardFooter>
          </div>
        </Card>
      </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
