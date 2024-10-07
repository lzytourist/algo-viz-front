import {Button} from "@/components/ui/button";
import { Book, BarChart, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function GettingStarted() {
  return (
    <section className="w-full py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Getting Started</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <Book className="w-12 h-12 text-green-600 mb-4"/>
            <h3 className="text-2xl font-semibold text-gray-800">Select an Algorithm</h3>
            <p className="text-gray-600 mt-2">
              Browse through a wide range of algorithms and data structures available on AlgoViz. Search by name or
              category.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <BarChart className="w-12 h-12 text-green-600 mb-4"/>
            <h3 className="text-2xl font-semibold text-gray-800">Watch it in Action</h3>
            <p className="text-gray-600 mt-2">
              Watch step-by-step visualizations of how the algorithm works. Modify inputs or speed to see how the
              algorithm responds.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <Lightbulb className="w-12 h-12 text-green-600 mb-4"/>
            <h3 className="text-2xl font-semibold text-gray-800">Learn & Practice</h3>
            <p className="text-gray-600 mt-2">
              Read detailed explanations and try out practice problems to solidify your understanding.
            </p>
          </div>

        </div>

        {/* Call to Action Button */}
        <div className="mt-8">
          <Button asChild variant={'outline'} className="text-lg">
            <Link href={'/algorithms'}>Start Exploring</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
