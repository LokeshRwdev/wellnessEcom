import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Uncomment to implement authentication checks, redirects, etc.
  // const isLoggedIn = request.cookies.has('auth-token')
  
  // Protected routes example
  // if (!isLoggedIn && request.nextUrl.pathname.startsWith('/account')) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Add protected routes here
    // '/account/:path*',
    // '/checkout',
  ],
}