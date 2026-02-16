import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify the secret token for security
  const secret = request.headers.get('x-sanity-webhook-secret');
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Revalidate the home page where projects are fetched
    await fetch(new URL('/', process.env.VERCEL_URL || 'http://localhost:3000').toString(), {
      headers: {
        'x-prerender-revalidate': process.env.VERCEL_PRERENDER_SECRET || '',
      },
    });
    
    return NextResponse.json(
      { message: 'Cache revalidated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating cache', error },
      { status: 500 }
    );
  }
}
