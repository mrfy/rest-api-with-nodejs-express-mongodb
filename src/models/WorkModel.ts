const mongoose = require('mongoose');

import {
  getModelForClass,
  index,
  modelOptions,
  prop,
} from '@typegoose/typegoose';

// const WorkSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   about: { type: String, required: true },
//   color: { type: String, required: true },
//   web: { type: String, required: true },
//   android: { type: String, required: true },
//   ios: { type: String, required: true },
//   graphic: { type: String, required: true },
//   user_id: { type: String, required: true },
//   icon: String,
//   website: String,
//   company: { type: String, required: true },
// });

@modelOptions({ schemaOptions: { collection: 'Works', timestamps: true } })
@index({ name: 1 })
export class Work {
  @prop({ required: true, type: () => String })
  name!: string;

  @prop({ required: true, type: () => String })
  about!: string;

  @prop({ required: true, type: () => String })
  color!: string;

  @prop({ required: true, type: () => String })
  web!: string;

  @prop({ required: true, type: () => String })
  android!: string;

  @prop({ required: true, type: () => String })
  ios!: string;

  @prop({ required: true, type: () => String })
  graphic!: string;

  @prop({ required: true, type: () => String })
  user_id!: string;

  @prop({ required: true, type: () => String })
  icon!: string;

  @prop({ required: true, type: () => String })
  website!: string;

  @prop({ required: true, type: () => String })
  company!: string;
}

const WorkModel = getModelForClass(Work);

export default WorkModel;
