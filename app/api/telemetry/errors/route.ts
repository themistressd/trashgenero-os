import { NextResponse } from 'next/server';

type ErrorTelemetryPayload = {
  type: 'error' | 'unhandledrejection';
  message: string;
  stack?: string;
  source?: string;
  line?: number;
  column?: number;
  path?: string;
  timestamp: number;
};

const isErrorTelemetryPayload = (payload: unknown): payload is ErrorTelemetryPayload => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    (candidate.type === 'error' || candidate.type === 'unhandledrejection') &&
    typeof candidate.message === 'string' &&
    typeof candidate.timestamp === 'number'
  );
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;

    if (!isErrorTelemetryPayload(body)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    console.error('[client-error-ingest]', {
      ...body,
      receivedAt: Date.now(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Malformed JSON payload' }, { status: 400 });
  }
}
