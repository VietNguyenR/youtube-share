import { model, models, Schema } from 'mongoose';

const VideosSchema: Schema = new Schema({
  youtubeId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  shared_by: {
    type: String,
  },
  created_at: {
    type: Date,
  },
});

export const VideosModel = models.Videos || model('Videos', VideosSchema);
