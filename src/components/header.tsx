import NavLink from "@/components/nav-link";
import Link from "next/link";
import {getSession} from "@/lib/jwt";
import AccountDropdown from "@/components/account-dropdown";

export default async function Header() {
  const session = await getSession()

  return (
    <header
      className={'sticky top-0 z-50 border-b bg-background/40 backdrop-blur supports-[backdrop-blur]:bg-background/60'}>
      <nav className={''}>
        <div className={'container h-16 flex items-center justify-between'}>
          <div className={'flex items-center gap-8'}>
            <h1 className={'text-4xl font-extrabold'}>
              <Link href={'/'}>
                Algo<span className={'text-primary'}>Viz</span>
              </Link>
            </h1>
            <div className={'hidden lg:flex lg:items-center lg:gap-2'}>
              <NavLink href={'/'} text={'Home'}/>
              <NavLink href={'/algorithms'} text={'Algorithms'}/>
            </div>
          </div>
          <div className={'flex items-center gap-2'}>
            {
              !session ? (
                <>
                  <NavLink href={'/sign-in'} text={'Sign In'}/>
                  <NavLink href={'/sign-up'} text={'Sign Up'}/>
                </>
              ) : (
                <AccountDropdown user={session.user as { first_name: string, last_name: string, email: string }}/>
              )
            }
          </div>
        </div>
      </nav>
    </header>
  )
}