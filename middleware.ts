import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { projects } from './projects.config';

const disabledPrefixes = projects
  .filter((p) => !p.enabled)
  .flatMap((p) => [`/${p.name}/`, `/${p.name}`, `/api/${p.name}/`, `/api/${p.name}`]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDisabled = disabledPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + (prefix.endsWith('/') ? '' : '/'))
  );
  if (isDisabled) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
