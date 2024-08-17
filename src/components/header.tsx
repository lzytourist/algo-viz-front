import {NavLink} from "@/components/nav-link";
import Link from "next/link";
import {getSession} from "@/lib/jwt";
import AccountDropdown from "@/components/account-dropdown";

export default async function Header() {
  const session = await getSession()

  return (
    <header className={'border-b h-16 flex items-center'}>
      <nav className={'w-full'}>
        <div className={'container flex items-center justify-between'}>
          <div className={'flex items-center gap-8'}>
            <h1 className={'text-5xl font-light'}>
              <Link href={'/'}>
                Algo<span className={'text-primary font-normal'}>Viz</span>
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
                <AccountDropdown user={session.user as {first_name: string, last_name: string, email: string}}/>
              )
            }

          </div>
        </div>
      </nav>
    </header>
  )
}