import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import SignUpForm from "@/components/forms/sign-up";

export default async function Page() {
  return (
    <div className={'container flex justify-center my-8'}>
      <div className={'min-w-96 max-w-2xl'}>
        <Card className={''}>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm/>
          </CardContent>
          <CardFooter>
            <p className={'text-center'}>
              Already have an account?
              <Link href={'/sign-in'}>Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}