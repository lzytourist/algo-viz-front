import {NextRequest, NextResponse} from "next/server";
import {getSession, updateSession} from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const session = await getSession();
  if (req.nextUrl.pathname.startsWith('/account') || req.nextUrl.pathname.startsWith('/password')) {
    if (!session) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  const res = NextResponse.next();
  if (!!session) {
    const updates = await updateSession();
    res.cookies.set(updates.key, updates.value, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      expires: updates.expires
    });
  }
  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}