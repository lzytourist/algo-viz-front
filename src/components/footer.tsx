import {Github, Linkedin} from "lucide-react";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="w-full bg-secondary/70 pt-8 text-secondary-foreground">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">

        <div className="mb-6 md:mb-0">
          <h3 className="text-3xl font-bold">AlgoViz</h3>
        </div>

        <nav className="mb-6 md:mb-0">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <li>
              <Link href="/about" className="hover:text-gray-400 transition">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-gray-400 transition">Privacy Policy</Link>
            </li>
            <li>
              <a href="/terms" className="hover:text-gray-400 transition">Terms of Service</a>
            </li>
          </ul>
        </nav>

        <div>
          <ul className="flex space-x-6">
            <li>
              <Link
                href={"https://github.com/lzytourist/algo-viz-front"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-400 transition"
              >
                <Github className="mr-2" /> GitHub
              </Link>
            </li>
            <li>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-400 transition"
              >
                <Linkedin className="mr-2" /> LinkedIn
              </Link>
            </li>
          </ul>
        </div>

      </div>
      <div className="py-4 text-center text-sm bg-secondary">
        &copy; {new Date().getFullYear()} AlgoViz. All rights reserved.
      </div>
    </footer>
  );
}