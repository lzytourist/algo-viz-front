'use client'

import {Button} from "@/components/ui/button";
import {ReactNode} from "react";
import {ReloadIcon} from "@radix-ui/react-icons";

export default function SubmitButton({children, pending}: { children: ReactNode, pending: boolean }) {
  return (
    <Button disabled={pending} className={'w-full flex items-center gap-2'}>
      {children}
      {pending && <ReloadIcon className={'animate-spin'}/>}
    </Button>
  )
}