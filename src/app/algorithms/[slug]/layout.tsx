import {ReactNode} from "react";

export default async function Layout({children, comments}: {children: ReactNode, comments: ReactNode}) {
  return (
    <>
      {children}
      {comments}
    </>
  )
}