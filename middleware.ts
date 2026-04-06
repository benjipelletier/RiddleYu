import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Disabled projects — keep in sync with projects.config.ts
const DISABLED = ['gumai', 'tongyizuo', 'zhujie', 'jazz', 'engine'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  for (const name of DISABLED) {
    if (path === `/${name}` || path.startsWith(`/${name}/`) ||
        path === `/api/${name}` || path.startsWith(`/api/${name}/`)) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
