'use client'

import {activate} from "@/actions/auth";
import {redirect} from "next/navigation";
import {useEffect, useRef, useTransition} from "react";
import {toast} from "@/components/ui/use-toast";
import {ReloadIcon} from "@radix-ui/react-icons";

export default function Page({params: {uid, token}}: { params: {uid: string, token: string} }) {
  const [pending, startTransition] = useTransition();
  const ref = useRef<boolean>(true);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;

      startTransition(async () => {
        const res = await activate({uid, token});
        if (res.status === 204) {
          toast({
            title: 'Account activation successful'
          });
          redirect('/sign-in');
        } else {
          toast({
            title: 'Something went wrong!',
            variant: 'destructive'
          })
        }
      });
    }
  }, [uid, token]);

  return pending ? (
    <div className={'flex items-center justify-center my-8'}>
      <p>Please wait</p>
      <ReloadIcon className={'animate-spin'} />
    </div>
  ) : "";
}