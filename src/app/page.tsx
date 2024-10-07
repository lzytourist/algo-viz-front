import Overview from "@/components/overview";
import GettingStarted from "@/components/getting-started";
import RecentAlgorithms from "@/components/recent-algorithms";

export default function Home() {
  return (
    <div className={''}>
      <Overview/>
      <GettingStarted/>
      <RecentAlgorithms/>
    </div>
  );
}
