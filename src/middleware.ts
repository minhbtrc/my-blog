import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  const { pathname } = new URL(req.url)
  const headers = new Headers(req.headers)
  headers.set('x-forwarded-pathname', pathname)
  return NextResponse.next({ request: { headers } })
}
