import {
  getModelForClass,
  index,
  modelOptions,
  prop,
} from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'Skills', timestamps: true } })
@index({ name: 1 })
export class Skill {
  @prop({ required: true, type: () => String })
  name!: string;

  @prop({ required: true, type: () => String })
  type!: string;

  @prop({ required: true, type: () => String })
  user_id!: string;
}

const SkillModel = getModelForClass(Skill);

export default SkillModel;
