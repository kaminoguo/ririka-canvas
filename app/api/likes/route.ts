import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const LIKES_KEY = 'site:likes';

export async function GET() {
  try {
    const likes = await redis.get(LIKES_KEY) || 0;
    return NextResponse.json({ likes: Number(likes) });
  } catch (error) {
    console.error('Error getting likes:', error);
    return NextResponse.json({ likes: 0 });
  }
}

export async function POST() {
  try {
    const likes = await redis.incr(LIKES_KEY);
    return NextResponse.json({ likes });
  } catch (error) {
    console.error('Error incrementing likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}