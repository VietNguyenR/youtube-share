/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';

import connectToDatabase from '@/lib/mongodb';
import { UserModel } from '@/models/User';
import type { QueryProps } from '@/shared/type';
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

export const findOneUserByParams = async ({
  filter,
  projection,
  options,
}: QueryProps) => {
  try {
    await connectToDatabase();
    return await UserModel.findOne(filter, projection, options);
  } catch (error: any) {
    throwErrors(`Users collection: ${error}`);
  }
};
