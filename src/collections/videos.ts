/* eslint-disable consistent-return */
import connectToDatabase from '@/lib/mongodb';
import { VideosModel } from '@/models/Videos';
import type { QueryProps, VideoItemProps } from '@/shared/type';
import { getTimestamp } from '@/utils/common';
import { throwErrors } from '@/utils/errorHandle';

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

export const findVideosByParams = async ({
  filter,
  projection,
  options,
}: QueryProps) => {
  try {
    await connectToDatabase();
    return await VideosModel.find(filter, projection, options);
  } catch (error: any) {
    throwErrors(`findVideosByParams: ${error}`);
  }
};
