import { NextRequest, NextResponse } from 'next/server';
import ThreadsApi from '@/util/threadsAPI';

export async function POST(request: NextRequest) {
  const { url } = await request.json();
  const data = await ThreadsApi.getMedia(url);
  return NextResponse.json(data);
}
