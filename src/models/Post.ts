const mongoose = require("mongoose");

import {
  Ref,
  Severity,
  index,
  modelOptions,
  plugin,
  prop,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "paperless.templates",
    optimisticConcurrency: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Template extends BaseDatabaseObject {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, unique: true })
  code!: string;

  @prop({ default: SYSTEM_STATUSES.INACTIVE, enum: SYSTEM_STATUSES })
  statusId!: string;

  @prop({
    default: [],
    ref: () => Tag,
    type: () => String,
    // type: Buffer,
    // subtype: 4,
    autopopulate: { select: "id" },
  })
  tags!: Ref<Tag, string>[];

  @prop({ default: [], type: [String], enum: PaperlessFormContext })
  context!: string[];

  @prop({
    required: true,
    ref: () => Account,
    type: Buffer,
    subtype: 4,
    autopopulate: { select: "id username name firstName lastName statusId" },
  })
  createdBy!: Ref<Account>;

  @prop({
    required: true,
    ref: () => Account,
    type: Buffer,
    subtype: 4,
    autopopulate: { select: "id username name firstName lastName statusId" },
  })
  updatedBy!: Ref<Account>;

  @prop({
    required: true,
    ref: () => TemplateRevision,
    type: Buffer,
    subtype: 4,
    autopopulate: {
      select: "id number createdAt updatedAt statusId updatedBy",
    },
  })
  currentRevision!: Ref<TemplateRevision>;

  @prop({
    ref: () => TemplateRevision,
    type: Buffer,
    subtype: 4,
    autopopulate: {
      select: "id number createdAt updatedAt statusId updatedBy",
    },
  })
  nextRevision?: Ref<TemplateRevision>;
}

const PostSchema = mongoose.Schema({
  title: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("posts", PostSchema);
