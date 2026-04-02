import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'pta_creator_session';
const ADMIN_SESSION_COOKIE = 'admin_session_pta';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Strict Portal Lock (enabled by default unless explicitly unlocked)
  const isPortalsLocked = process.env.HIDE_ADMIN_PORTAL === "true";

  if (isPortalsLocked && (pathname.startsWith('/admin') || pathname.startsWith('/creator-portal'))) {
    // Redirect to home if portals are sealed off
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Protect /creator-portal
  if (pathname.startsWith('/creator-portal')) {
    const session = request.cookies.get(SESSION_COOKIE_NAME);
    
    if (!session) {
      // Redirect to creators page if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = '/creators';
      return NextResponse.redirect(url);
    }
  }

  // Protect /admin
  if (pathname.startsWith('/admin') && pathname !== '/admin') { // Allow login check but protect routes
     const session = request.cookies.get(ADMIN_SESSION_COOKIE);
     if (!session) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin'; // Redirect to login page
        return NextResponse.redirect(url);
     }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/creator-portal/:path*', '/admin/:path*'],
};
