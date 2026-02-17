import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_GAMIFICATION = {
  points: {
    pesetrash: 0,
    estampitas: 0,
    reliquias: 0,
  },
  rank: null,
  next_rank: null,
  can_rank_up: false,
  progress_to_next: 0,
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const joinedPath = path.join('/');

  if (joinedPath === 'trashgenero/v1/user/gamification') {
    return NextResponse.json({
      success: true,
      data: DEFAULT_GAMIFICATION,
    });
  }

  if (joinedPath === 'trashgenero/v1/ranks') {
    return NextResponse.json({
      success: true,
      data: [],
    });
  }

  if (/^trashgenero\/v1\/points\/(pesetrash|estampitas|reliquias)\/history$/.test(joinedPath)) {
    return NextResponse.json({
      success: true,
      data: [],
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: `Mock endpoint not implemented: ${joinedPath}`,
    },
    { status: 404 }
  );
}
