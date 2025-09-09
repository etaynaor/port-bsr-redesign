import { NextRequest, NextResponse } from 'next/server'

// Protect the site with Basic Auth in production.
// Set env vars BASIC_AUTH_USER and BASIC_AUTH_PASS to enable.
export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== 'production') return NextResponse.next()

  const user = process.env.BASIC_AUTH_USER
  const pass = process.env.BASIC_AUTH_PASS
  if (!user || !pass) return NextResponse.next()

  const header = req.headers.get('authorization')
  const expected = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`

  if (header === expected) {
    // Optionally set a short-lived cookie to reduce prompts
    const res = NextResponse.next()
    res.cookies.set('auth', '1', { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 })
    return res
  }

  // If a previous cookie exists, allow
  if (req.cookies.get('auth')?.value === '1') return NextResponse.next()

  return new NextResponse('Authorization Required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Private"' },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

