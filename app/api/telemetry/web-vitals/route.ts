import { NextResponse } from 'next/server';

type WebVitalsPayload = {
  id: string;
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  navigationType?: string;
  timestamp?: number;
  path?: string;
};

const isWebVitalsPayload = (payload: unknown): payload is WebVitalsPayload => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.value === 'number'
  );
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;

    if (!isWebVitalsPayload(body)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Baseline ingestion: for now we log structured data.
    // This route can later forward to an external observability backend.
    console.info('[web-vitals-ingest]', {
      ...body,
      receivedAt: Date.now(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Malformed JSON payload' }, { status: 400 });
  }
}
