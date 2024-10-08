import Overview from "@/components/overview";
import GettingStarted from "@/components/getting-started";
import RecentAlgorithms from "@/components/recent-algorithms";
import TrackProgress from "@/components/track-progress";

export default function Home() {
  return (
    <div className={''}>
      <Overview/>
      <GettingStarted/>
      <TrackProgress/>
      <RecentAlgorithms/>
    </div>
  );
}
