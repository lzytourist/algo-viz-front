import {formatDate, Result} from "@/actions/algorithm";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {ArrowRightIcon} from "@radix-ui/react-icons";

const baseUrl = `${process.env.BASE_API_ENDPOINT}`;

export default async function RecentAlgorithms() {
  const response = await fetch(`${baseUrl}/algorithms/?pageSize=3`);
  const result = await response.json() as Result;
  const algorithms = result.results;

  return (
    <section className="w-full py-20 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-8">Recent</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {algorithms.map((algorithm, index) => (
            <Card key={algorithm.slug}>
              <CardHeader>
                <CardTitle className={'text-2xl'}>{algorithm.name}</CardTitle>
                <CardDescription className={'text-primary'}>
                  <Link href={`/algorithms?category=${algorithm.category?.slug}`}>{algorithm.category?.name}</Link>
                </CardDescription>
                <CardDescription>{formatDate(algorithm.created_at)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={'line-clamp-2'} dangerouslySetInnerHTML={{__html: algorithm.description ?? ''}}></div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/algorithms/${algorithm.slug}`} className={'flex items-center gap-2 uppercase'}>
                    learn more
                    <ArrowRightIcon/>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}