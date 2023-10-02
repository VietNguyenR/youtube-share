import type {
  FilterQuery,
  ObjectId,
  ProjectionType,
  QueryOptions,
} from 'mongoose';

export interface VideoItemProps {
  youtubeId: string;
  title: string;
  description: string;
  shared_by?: string;
}

export interface VideoItemResponseProps extends VideoItemProps {
  _id: ObjectId;
  created_at: string;
}

export interface VideoListProps {
  videos: VideoItemResponseProps[];
}

export interface QueryProps {
  filter: FilterQuery<any>;
  projection?: ProjectionType<any> | null;
  options?: QueryOptions<any> | null;
}
