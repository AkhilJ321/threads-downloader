import { NextRequest, NextResponse } from 'next/server';
import ThreadsApi from '@/util/threadsAPI';

export async function POST(request: NextRequest) {
  if (request.method === 'POST') {
    const { url } = await request.json();
    const data = await ThreadsApi.getMedia(url);
    return NextResponse.json(data);
  }
}

export async function GET(request: NextRequest) {
  const url = request.url.split('/api?url=')[1];
  console.log('[DEBUG] /api url', url);

  const { buffer, mime } = await ThreadsApi.getArrayBuffer(url);
  console.log('[DEBUG] /api buffer', buffer, mime);
  if (!buffer || !mime) return NextResponse.error();

  const response = new NextResponse(buffer);
  response.headers.set('content-type', mime);
  return response;
}
