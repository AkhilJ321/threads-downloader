import { NextRequest, NextResponse } from 'next/server';
import ThreadsApi from '@/util/threadsAPI';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    const data = await ThreadsApi.getMedia(url);
    if (data.success === true) {
      return new NextResponse(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('Post Not Found!Check your URL.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Error fetching data. Please try again.' }),
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const url = request.url.split('/api?url=')[1];
  console.log('[DEBUG] /api url', url);
  try {
    const { buffer, mime } = await ThreadsApi.getArrayBuffer(url);
    console.log('[DEBUG] /api buffer', buffer, mime);
    if (!buffer || !mime) return new NextResponse(null, { status: 404 });
    const response = new NextResponse(buffer);
    response.headers.set('content-type', mime);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return new NextResponse(null, { status: 500 });
  }
}
