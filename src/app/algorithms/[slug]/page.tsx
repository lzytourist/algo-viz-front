import {getAlgorithm, Algorithm} from "@/actions/algorithm";
import dynamic from "next/dynamic";

export default async function Page({params: {slug}}: { params: { slug: string } }) {
  const algorithm = await getAlgorithm(slug) as Algorithm;

  const AlgorithmComp = dynamic(() => import(`@/components/algorithms/${algorithm.component}.tsx`))

  return (
    <>
      <div className={'bg-gradient-to-r from-green-50 to-green-200 text-primary'}>
        <div className={'container h-36 lg:h-56 flex justify-center items-center'}>
          <h1 className={'text-4xl lg:text-6xl font-bold'}>{algorithm.name}</h1>
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