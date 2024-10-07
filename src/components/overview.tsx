import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Overview() {
  return (
    <section className="w-full bg-gradient-to-r from-green-50 to-green-200 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Master Algorithms & Data Structures <span className="text-green-600">Visually</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Learn, practice, and visualize complex algorithms interactively. Perfect for students, educators, and
          developers.
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild className="text-lg">
            <Link href={'/algorithms'}>Explore Visualizations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}