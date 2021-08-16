import {
  getModelForClass,
  index,
  modelOptions,
  prop,
} from '@typegoose/typegoose';

import { Document } from 'mongoose';

export interface IUserModel extends Document {
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  profile_picture: string;
  address: string;
}

@modelOptions({ schemaOptions: { collection: 'Users', timestamps: true } })
@index({ name: 1 })
export class User {
  @prop({ required: true, type: () => String })
  name!: string;

  @prop({
    default: '',
    required: false,
    type: String,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  })
  email!: string;

  @prop({ required: true, type: () => String })
  password!: string;

  @prop({ required: false, type: () => Date, default: Date.now() })
  created!: string;

  @prop({ required: false, type: () => String })
  header_text!: string;

  @prop({ required: false, type: () => String })
  header_subtext!: string;

  @prop({ required: false, type: () => String })
  profile_text!: string;

  @prop({ required: false, type: () => String })
  profile_about!: string;

  @prop({ required: true, type: () => String })
  profile_picture!: string;

  @prop({ required: false, type: () => String })
  address!: string;

  @prop({ required: false, type: () => String })
  phone!: string;

  @prop({ required: false, type: () => String })
  occupation!: string;
}
// ss

const UserModel = getModelForClass(User);

export default UserModel;
