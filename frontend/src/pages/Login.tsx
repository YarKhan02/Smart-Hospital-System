import React from 'react'
import { Button } from "../components/button"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/card"

interface LoginProps {
  onLogin: () => void;
}

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter your username" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
            </div>
            <Button className="w-full mt-4" type="submit">Login</Button>
        </CardContent>
      </Card>
    </div>
  )
}