import mongoose, {
  Document,
  Schema,
  Model,
  connect,
  model,
  ObjectId,
} from "mongoose";

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
export interface TeamAttrs {
  name: string;
  password: string;
  members: ObjectId[];
  billable_hrs: Number;
}

export interface TeamDoc extends Document, TeamAttrs {
  name: string;
  password: string;
  members: ObjectId[];
  billable_hrs: Number;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TeamModal extends Model<TeamAttrs> {
  build(attrs: TeamAttrs): TeamDoc;
}

const TeamSchema = new Schema<TeamDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    members: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    billable_hrs: {
      type: Number,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.desc;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

TeamSchema.statics.build = (attrs: TeamAttrs) => {
  return new Team(attrs);
};

const Team = model<TeamDoc, TeamModal>("Team", TeamSchema);

export { Team };
