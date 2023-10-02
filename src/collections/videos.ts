/* eslint-disable consistent-return */
import connectToDatabase from '@/lib/mongodb';
import { VideosModel } from '@/models/Videos';
import { getTimestamp } from '@/utils/common';
import { throwErrors } from '@/utils/errorHandle';

export interface VideoItemProps {
  youtubeId: string;
  title: string;
  description: string;
}

export const insertVideo = async (params: VideoItemProps) => {
  try {
    await connectToDatabase();
    return await VideosModel.create({
      youtubeId: params?.youtubeId ?? '',
      title: params?.title ?? '',
      description: params?.description ?? '',
      created_at: getTimestamp(),
    });
  } catch (error: any) {
    throwErrors(`Users collection: ${error}`);
  }
};

export const findVideosByParams = async (
  params: VideoItemProps,
  options: Record<string, any> = {},
) => {
  try {
    await connectToDatabase();
    return await VideosModel.find(params, options);
  } catch (error: any) {
    throwErrors(`Users collection: ${error}`);
  }
};
