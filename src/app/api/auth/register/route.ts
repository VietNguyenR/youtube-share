import { NextResponse } from 'next/server';
import { z as validator } from 'zod';

import { insertRegister } from '@/collections/user';

export async function POST(req: Request) {
  const schema: any = validator
    .object({
      username: validator.string().min(3).max(20),
      email: validator.string().email(),
      password: validator.string().min(3),
      confirmPassword: validator.string().min(3),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirm'],
    });

  const formData = await req.json();
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

  const { username, email, password } = response.data;
  insertRegister({ username, email, password });

  return NextResponse.json({ success: true });
}
