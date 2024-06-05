import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  if (!token) {
    // If the user is not authenticated
    if (path === '/frontview/profile') {
      // Redirect unauthenticated users to the login page if they try to access the profile page
      return NextResponse.redirect(new URL('/frontview/login', request.url));
    }
  } else {
    // If the user is authenticated
    if (path === '/frontview/login' || path === '/frontview/signup') {
      // Redirect authenticated users to the home page if they try to access the login or signup pages
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/frontview/profile',
    '/frontview/login',
    '/frontview/signup',
  ],
};
