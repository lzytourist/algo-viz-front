import {getSession} from "@/lib/jwt";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import CommentForm from "@/components/forms/comment";
import {Comment, formatDate, getComments, Result} from "@/actions/algorithm";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

export default async function Page({params: {slug}, searchParams: {page}}: {
  params: { slug: string },
  searchParams: { page?: number }
}) {
  const session = await getSession();

  const _page: number = Number(page ?? 1).valueOf();
  const comments = await getComments(slug, _page);

  const pageCount = Math.ceil(_page / 15);

  return (
    <div className={'bg-secondary container py-8'}>
      <div className={'grid gap-4 grid-cols-1 lg:grid-cols-3'}>
        <div className={''}>
          {
            !session ? (
              <div className={''}>
                <h3 className={'text-3xl mb-2 text-secondary-foreground/70'}>Please login to share your thoughts.</h3>
                <Button asChild>
                  <Link href={'/sign-in'}>Sign In</Link>
                </Button>
              </div>
            ) : (
              <>
                <h3 className={'text-3xl mb-2 text-secondary-foreground/70'}>Share your thoughts</h3>
                <CommentForm slug={slug}/>
              </>
            )
          }
        </div>
        <div className={'col-span-2 space-y-2'}>
          {
            comments.results.map((comment: Comment, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{comment.user}</CardTitle>
                  <CardDescription>{formatDate(comment.created_at)}</CardDescription>
                </CardHeader>
                <CardContent className={'text-justify'}>
                  {comment.text}
                </CardContent>
              </Card>
            ))
          }
          {
            pageCount > 1 && <Pagination>
              <PaginationContent>
                <PaginationPrevious href={`/algorithms/${slug}?page=${Math.max(1, _page - 1)}`}/>
                {
                  Array.from({length: pageCount}).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink href={``}>{index + 1}</PaginationLink>
                    </PaginationItem>
                  ))
                }
                <PaginationNext href={`/algorithms/${slug}?page=${Math.min(pageCount, _page + 1)}`}/>
              </PaginationContent>
            </Pagination>
          }
        </div>
      </div>
    </div>
  )
}