import {getSession} from "@/lib/jwt";

export default async function Home() {
  const session = await getSession();
  return (
    <div>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
