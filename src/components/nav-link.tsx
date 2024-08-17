'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";

export function NavLink({ href, text }: { href: string, text: string }) {
  const pathname = usePathname();

  return (
    <Link
      className={pathname == href ? 'text-primary' : 'text-secondary-foreground'}
      href={href}>{text}</Link>
  )
}