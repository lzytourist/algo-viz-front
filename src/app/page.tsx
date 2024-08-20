import {getSession} from "@/lib/jwt";
import AStar from "@/components/algorithms/graph/a-star";
import BFS from "@/components/algorithms/graph/bfs";

export default async function Home() {
  const session = await getSession();
  return (
    <div className={'container my-8'}>
      <AStar/>
    </div>
  );
}
