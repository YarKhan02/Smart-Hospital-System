import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from "../components/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Icons } from "../components/icons";

import { Auth } from 'aws-amplify';

export default function SignupPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errors, setErrors] = React.useState('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault(); // Make sure this prevents page refresh
    setIsLoading(true);
    setErrors('');

    try {
      const { user } = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: name,
          email: email,
          preferred_username: username,
        },
        autoSignIn: {
          enabled: true,
        }
      });
      console.log(user);
      window.location.href = `/confirm?email=${email}`;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setErrors(error.message);
      } else {
        console.error('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const name_onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const email_onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const username_onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const password_onchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Me" value={name} onChange={name_onchange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="abc@example.com" value={email} onChange={email_onchange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={password_onchange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            {errors && <div className="text-red-500 text-center">{errors}</div>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}