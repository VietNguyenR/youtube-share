/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';

import connectToDatabase from '@/lib/mongodb';
import { UserModel } from '@/models/User';
import { getTimestamp } from '@/utils/common';
import { throwErrors } from '@/utils/errorHandle';

interface UserParamsProps {
  username?: string;
  email?: string;
  password?: string;
}

export const insertUser = async (params: UserParamsProps) => {
  try {
    await connectToDatabase();
    return await UserModel.create({
      username: params?.username ?? '',
      email: params?.email ?? '',
      password: params?.password ? bcrypt.hashSync(params?.password, 10) : '',
      created_at: getTimestamp(),
    });
  } catch (error: any) {
    throwErrors(`Users collection: ${error}`);
  }
};

export const findOneUserByParams = async (
  params: UserParamsProps,
  options: Record<string, any> = {},
) => {
  try {
    await connectToDatabase();
    return await UserModel.findOne(params, options);
  } catch (error: any) {
    throwErrors(`Users collection: ${error}`);
  }
};
