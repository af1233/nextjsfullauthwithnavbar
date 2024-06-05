 
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import connectToDB from './utils/db';

connectToDB();

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';
  const validPath = path === '/frontview/login' || path === '/frontview/signup';

  if (validPath && token) {
    // User is already authenticated, redirect to the home page
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!token) {
      // User is already authenticated, redirect to the home page
      return NextResponse.redirect(new URL('/', request.url));
  }
  if (!validPath && !token) {
    // User is not authenticated, redirect to the login page
    return NextResponse.redirect(new URL('/frontview/login', request.url));
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/frontview/profile',
  ],
};
