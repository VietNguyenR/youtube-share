import { NextResponse } from 'next/server';
import { z as validator } from 'zod';

import { findOneUserByParams, insertUser } from '@/collections/user';

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
      path: ['confirmPassword'],
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

  const [findEmail, findUsername] = await Promise.all([
    findOneUserByParams({ email: formData.email }),
    findOneUserByParams({ username: formData.username }),
  ]);
  if (findEmail || findUsername) {
    return NextResponse.json(
      {
        success: false,
        error: [
          findEmail && { message: 'Email already exists', path: ['email'] },
          findUsername && {
            message: 'Username already exists',
            path: ['username'],
          },
        ],
      },
      { status: 400 },
    );
  }

  const { username, email, password } = response.data;
  insertUser({ username, email, password });

  return NextResponse.json({ success: true });
}
