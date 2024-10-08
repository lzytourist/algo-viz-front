import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import {getAlgorithms, Algorithm, Result, formatDate} from "@/actions/algorithm";
import {
  Pagination,
  PaginationContent,
  PaginationItem, PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export default async function Page({searchParams: {page, category}}: {
  searchParams: { page?: string, category?: string }
}) {
  const algorithms = await getAlgorithms(Number(page ?? 1).valueOf(), category) as Result;

  const pageCount: number = Math.ceil(algorithms.count / 15);
  const _page: number = Number(page ?? 1).valueOf();

  return (
    <div className={'bg-secondary'}>
      <div className={'h-36 lg:h-56 bg-gradient-to-r from-green-50 to-green-200 text-primary'}>
        <div className={'container h-full flex items-center justify-center'}>
          <h1 className={'text-5xl font-bold'}>Algorithms</h1>
        </div>
      </div>
      <div className={'container py-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
        {
          algorithms.results.map((algorithm: Algorithm) => (
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
          ))
        }
      </div>
      {
        pageCount > 1 && (
          <div className={'container mb-8'}>
            <Pagination>
              <PaginationContent>
                <PaginationPrevious href={
                  `/algorithms/?page=${Math.max(_page - 1, 1)}` +
                  `${category ? '&category=' + category : ''}`
                }/>
                {
                  Array.from({length: pageCount}).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={index + 1 == _page}
                        href={
                          `/algorithms?page=${index + 1}` +
                          `${category ? '&category=' + category : ''}`
                        }>{index + 1}</PaginationLink>
                    </PaginationItem>
                  ))
                }
                <PaginationNext href={
                  `/algorithms/?page=${Math.min(_page + 1, pageCount)}` +
                  `${category ? '&category=' + category : ''}`
                }/>
              </PaginationContent>
            </Pagination>
          </div>
        )
      }
    </div>
  )
}