import mongoose, {
  Document,
  Schema,
  Model,
  connect,
  model,
  ObjectId,
} from "mongoose";
import { Team } from "./team.model";

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
export interface EmployeeAttrs {
  name: string;
  middle_name: string;
  surname: string;
  dob: string;
  gender: Gender;
  address: string;
  phone_number: string;
  email: string;
  starts_at: string;
  ends_at: string;
  job_position: string;
  team: ObjectId[];
  is_billable: boolean;
  billable_hrs: Number;
}

export interface EmployeeDoc extends Document, EmployeeAttrs {
  name: string;
  middle_name: string;
  surname: string;
  dob: string;
  gender: Gender;
  address: string;
  phone_number: string;
  email: string;
  starts_at: string;
  ends_at: string;
  job_position: string;
  team: ObjectId[];
  is_billable: boolean;
  billable_hrs: Number;

  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface EmployeeModal extends Model<EmployeeAttrs> {
  build(attrs: EmployeeAttrs): EmployeeDoc;
}

const EmployeeSchema = new Schema<EmployeeDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: false,
      default: "",
    },
    surname: {
      type: String,
      required: true,
    },

    dob: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    starts_at: {
      type: String,
      required: true,
    },
    ends_at: {
      type: String,
      required: true,
    },
    job_position: {
      type: String,
      required: true,
    },
    team: {
      type: [Schema.Types.ObjectId],
      ref: Team,
      default: [],
      required: false,
    },
    is_billable: {
      type: Boolean,
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

EmployeeSchema.statics.build = (attrs: EmployeeAttrs) => {
  return new Employee(attrs);
};

const Employee = model<EmployeeDoc, EmployeeModal>("Employee", EmployeeSchema);

export { Employee };
