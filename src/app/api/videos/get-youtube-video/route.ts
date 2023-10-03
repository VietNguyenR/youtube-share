import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z as validator } from 'zod';

export async function POST(request: NextRequest) {
  const schema: any = validator.object({
    youtubeId: validator.string(),
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

  const videoRequest = await fetch(
    `https://www.youtube.com/watch?v=${formData.youtubeId}`,
  );
  const responseBody = await videoRequest.text();
  if (!responseBody) {
    return NextResponse.json(
      {
        success: false,
        error: 'responseBody is not valid or undefined',
      },
      { status: 400 },
    );
  }
  const videoTitle =
    responseBody?.match(/<meta name="title" content="(.*?)"/)?.[1] ?? '';
  let videoDescription =
    responseBody?.match(
      /"attributedDescriptionBodyText":{"content":"(.*?)","/,
    )?.[1] ?? '';
  videoDescription = videoDescription.replace(/\\n/g, '<br />');
  videoDescription = videoDescription.replace(/\\/g, '');
  return NextResponse.json({
    success: true,
    title: videoTitle,
    description: videoDescription,
  });
}
export const dynamic = 'force-dynamic';
