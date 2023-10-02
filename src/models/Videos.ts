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
  created_at: {
    type: Date,
  },
});

export const VideosModel = models.User || model('User', VideosSchema);
