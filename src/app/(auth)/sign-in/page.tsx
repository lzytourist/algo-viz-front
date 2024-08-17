import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import SignInForm from "@/components/forms/sign-in";

export default async function Page() {
  return (
    <div className={'container flex justify-center my-8'}>
      <div className={'min-w-96 max-w-xl'}>
        <Card className={''}>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm/>
          </CardContent>
          <CardFooter>
            <p className={'text-center'}>
              Don&apos;t have an account?
              <Link href={'/sign-up'}>Sign up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}