// app/api/login/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // 模拟登录验证
  if (username === 'admin' && password === 'password123') {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid username or password' });
  }
}
