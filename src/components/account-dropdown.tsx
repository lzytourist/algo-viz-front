'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {signOut} from "@/actions/auth";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

export default function AccountDropdown({user}: {user: {first_name: string, last_name: string, email: string}}) {
  const router = useRouter();

  const logout = async () => {
    await signOut();
    toast({
      title: "Signed out successfully"
    });
    router.push('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={'https://github.com/shadcn.png'}/>
          <AvatarFallback>{user.first_name.charAt(0) + user.last_name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>{user.first_name}</DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem asChild>
          <Link href={'/account'} className={'cursor-pointer'}>Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/change-password'} className={'cursor-pointer'}>Change password</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className={'cursor-pointer'} onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}