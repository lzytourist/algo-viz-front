import {authUser} from "@/actions/auth";
import {getSession} from "@/lib/jwt";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import UpdateAccountForm from "@/components/forms/update-account";

export default async function Page() {
  const session = await getSession();
  const user = await authUser(session?.token as string);

  return (
    <div className={'container py-8'}>
      <Card className={''}>
        <CardHeader>
          <CardTitle>Update account</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateAccountForm user={user}/>
        </CardContent>
      </Card>
    </div>
  )
}