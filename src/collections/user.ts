import connectToDatabase from '@/lib/mongodb';
import { UserModel } from '@/models/User';
import { getTimestamp } from '@/utils/common';
import { throwErrors } from '@/utils/errorHandle';

interface RegisterParamsProps {
  username: string;
  email: string;
  password: string;
}

// eslint-disable-next-line consistent-return
export const insertRegister = async (params: RegisterParamsProps) => {
  try {
    await connectToDatabase();
    return await UserModel.create({
      username: params?.username ?? '',
      email: params?.email ?? '',
      password: params?.password ?? '',
      created_at: getTimestamp(),
    });
  } catch (error: any) {
    throwErrors(`Users collection: ${error}`);
  }
};
