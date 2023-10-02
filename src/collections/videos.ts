/* eslint-disable consistent-return */
import connectToDatabase from '@/lib/mongodb';
import { VideosModel } from '@/models/Videos';
import { getTimestamp } from '@/utils/common';
import { throwErrors } from '@/utils/errorHandle';

export interface VideoItemProps {
  youtubeId: string;
  title: string;
  description: string;
  shared_by?: string;
}

export const insertVideo = async (params: VideoItemProps) => {
  try {
    await connectToDatabase();
    return await VideosModel.create({
      youtubeId: params?.youtubeId ?? '',
      title: params?.title ?? '',
      description: params?.description ?? '',
      shared_by: params?.shared_by ?? '',
      created_at: getTimestamp(),
    });
  } catch (error: any) {
    throwErrors(`insertVideo: ${error}`);
  }
};

export const findVideosByParams = async (
  params: Record<string, any> = {},
  options: Record<string, any> = {},
) => {
  try {
    await connectToDatabase();
    return await VideosModel.find(params, options);
  } catch (error: any) {
    throwErrors(`findVideosByParams: ${error}`);
  }
};
