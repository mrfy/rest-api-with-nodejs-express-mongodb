import {
  getModelForClass,
  index,
  modelOptions,
  prop,
} from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'Post', timestamps: true } })
@index({ name: 1 })
export class Post {
  @prop({ required: true, type: () => String })
  title!: string;

  @prop({ default: '', required: false, type: () => String })
  createdBy!: string;
}
// ss

const PostModel = getModelForClass(Post);

export default PostModel;
