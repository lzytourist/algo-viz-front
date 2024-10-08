import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function TrackProgress() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Track Your Progress
        </h2>

        <p className="text-lg text-gray-700 mb-8">
          Stay on top of your learning with personalized tracking. Monitor your algorithm challenges, track performance,
          and improve your skills with real-time insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-secondary-foreground p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-3.866 0-7 3.134-7 7h7v7c3.866 0 7-3.134 7-7h-7V8z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Personalized Dashboard</h3>
            <p className="text-gray-300">
              View your learning stats and progress from a personalized dashboard built just for you.
            </p>
          </div>

          <div className="bg-secondary-foreground p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Challenge Completion</h3>
            <p className="text-gray-300">
              Track your completed algorithm challenges and see how your performance improves over time.
            </p>
          </div>

          <div className="bg-secondary-foreground p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M9 7v10l3-3 3 3V7"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Real-Time Insights</h3>
            <p className="text-gray-300">
              Get instant feedback and insights on your problem-solving approach, helping you to improve faster.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Button asChild variant={'link'} className={'text-lg border hover:border-0 transition-all'}>
            <Link href={"/login"}>Start Tracking Your Progress</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}