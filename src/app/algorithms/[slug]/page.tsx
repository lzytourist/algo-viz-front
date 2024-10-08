import {getAlgorithm, Algorithm} from "@/actions/algorithm";
import dynamic from "next/dynamic";
import Link from "next/link";

export default async function Page({params: {slug}}: { params: { slug: string } }) {
  const algorithm = await getAlgorithm(slug) as Algorithm;

  const AlgorithmComp = dynamic(() => import(`@/components/algorithms/${algorithm.component}.tsx`))

  return (
    <>
      <div className={'bg-gradient-to-r from-green-50 to-green-200'}>
        <div className={'container lg:min-h-56 flex flex-col justify-center items-center'}>
          <h1 className={'font-extrabold text-center text-4xl lg:text-6xl'}>{algorithm.name}</h1>
          <Link
            className={'mt-8 text-primary'}
            href={`/algorithms?category=${algorithm.category?.slug}`}>{algorithm.category?.name}</Link>
        </div>
      </div>
      <div className={'container my-8'}>
        <section className={'mb-8'}>
          <AlgorithmComp/>
        </section>
        <section dangerouslySetInnerHTML={{__html: algorithm.description ?? ''}}></section>
      </div>
    </>
  )
}