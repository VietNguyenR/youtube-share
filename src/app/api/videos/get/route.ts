import { NextResponse } from 'next/server';

import { findVideosByParams } from '@/collections/videos';

export async function GET() {
  const allVideos = await findVideosByParams({}, { sort: { created_at: -1 } });
  return NextResponse.json(allVideos);
}
