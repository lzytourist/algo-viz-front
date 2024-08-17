import Link from "next/link";

export default async function Footer() {
  return (
    <footer className={'bg-secondary-foreground text-secondary'}>
      <div className={'container py-6 flex justify-between'}>
        <div>
          <p>&copy; {new Date().getFullYear()}, <Link href={'/'}>AlgoViz</Link></p>
        </div>
        <div className={'space-x-4'}>
          <Link href={'/about'}>About</Link>
          <Link href={'/contact'}>Contact</Link>
        </div>
      </div>
    </footer>
  )
}