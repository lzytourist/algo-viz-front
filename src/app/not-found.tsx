import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRightIcon} from "@radix-ui/react-icons";

export default async function NotFound() {
  return (
    <div className={'container py-8'}>
      <h1 className={'text-4xl text-destructive'}>Not Found</h1>
      <p className={'text-secondary-foreground text-2xl mt-2 mb-4'}>404 | Page not found</p>
      <Button asChild variant={'secondary'}>
        <Link href={'/'} className={'items-center gap-2'}>
          Goto home page
          <ArrowRightIcon/>
        </Link>
      </Button>
    </div>
  )
}