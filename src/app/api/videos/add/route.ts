import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z as validator } from 'zod';

import { insertVideo } from '@/collections/videos';

export async function POST(request: NextRequest) {
  const schema: any = validator.object({
    youtubeId: validator.string(),
    title: validator.string(),
    description: validator.string(),
    shared_by: validator.string(),
  });

  const formData = await request.json();
  const response = schema.safeParse(formData);
  if (!response.success) {
    const { errors } = response.error;
    return NextResponse.json(
      {
        success: false,
        error: errors,
      },
      { status: 400 },
    );
  }
  insertVideo(formData);
  return NextResponse.json({ success: true });
}
